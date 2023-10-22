import { BaseComponent } from './../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { DelayCounter } from 'src/app/mock-db/DelayCounter';
import { Event } from 'src/app/models/event';
import { RegGroup } from 'src/app/models/reg-group';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event-info-service';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import {
  GetShowInfoService,
  ShowInfo,
} from 'src/app/shared/services/get-show-info/get-show-info.service';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';
import { RegGroupDTOResp } from 'src/app/models/dto/reg-group-dto';
import { QueueDTO } from 'src/app/models/dto/queues-dto';
import { RegStatus, RegStepper } from '../../constants/reg-status';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-event-info',
  templateUrl: './view-event-info.component.html',
  styleUrls: ['./view-event-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewEventInfoComponent extends BaseComponent implements OnInit {
  eventID!: string | undefined;
  userID!: string | undefined;
  // Event information
  eventInfo!: Event;

  // Registration group information
  regGroupInfo: RegGroupDTOResp | undefined = undefined;
  hasUserConfirmed!: boolean;

  // Show Information
  showInfo!: ShowInfo[] | undefined;
  earliestShowDate!: Date;
  latestShowDate!: Date;

  // Variables for registration status
  registerStatus: RegStatus = RegStatus.NOT_LOGGED_IN;

  // Stepper steps
  steps: MenuItem[];
  activeIndex: number = 0;

  // Utility variables
  hasEventLoaded: boolean = false;
  hasRegGroupInfoLoaded: boolean = false;

  // QueueList
  queueList: QueueDTO[];

  constructor(
    protected override spinner: NgxSpinnerService,
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private getEventInfoService: GetEventInfoService,
    private getRegGroupService: GetRegistrationGroupService,
    private getShowInfoService: GetShowInfoService,
    private getUserInfoService: GetUserInfoService,
    private authService: AuthenticationService,
    private storeRegGroupService: StoreRegistrationGroupInfoService,
    private messageService: MessageService,
  ) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    this.queueList = [];
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    if (this.eventID == undefined) {
      this.router.navigate(['/home']);
      return;
    }

    this.steps = [
      {
        label: 'Register Group',
        command: (event: any) =>
          this.messageService.add({
            severity: 'info',
            summary: 'First Step',
            detail: event.item.label,
          }),
      },
      {
        label: 'Group Members Confirmation',
        command: (event: any) =>
          this.messageService.add({
            severity: 'info',
            summary: 'Second Step',
            detail: event.item.label,
          }),
      },
      {
        label: 'Queue Registration',
        command: (event: any) =>
          this.messageService.add({
            severity: 'info',
            summary: 'Third Step',
            detail: event.item.label,
          }),
      },
      {
        label: 'Tickets Purchased',
        command: (event: any) =>
          this.messageService.add({
            severity: 'info',
            summary: 'Fourth step',
            detail: event.item.label,
          }),
      },
    ];

    // Get event information
    this.getEventInfoService
      .getEventInfo(this.eventID)
      .subscribe((data: any) => {
        this.eventInfo = {
          eventID: data.id,
          name: data.name,
          countries: [],
          maxQueueable: data.maxQueueable,
          description: data.description,
          image: data.posterImagePath,
          isHighlighted: data.highlighted,
        };
        this.hasEventLoaded = true;
      });

    // Load user information if user is logged in.
    // Note that this function will be also be triggered when the user logs in after being routed to this page.
    this._updateUserEventInfo();
  }

  // ngAfterViewInit(): void {
  //   this.spinner.show();
  // }

  // ===========================================
  // Handle case where user logs in and logs out from the View Events page
  // ===========================================
  handleUserLoginLogoutChange(): void {
    this._updateUserEventInfo();
  }
  // ============================================
  // Boolean conditions for displaying items on the DOM
  // ============================================
  showGroupMembersInfo(): boolean {
    return (
      this.authService.isLoggedIn &&
      this.registerStatus != RegStatus.NOT_REGISTERED
    );
  }

  showQueuesInfo(): boolean {
    return(
      this.authService.isLoggedIn &&
      this.registerStatus >= RegStatus.REGISTERED
    )
  }

  datesAreValid(): boolean {
    return (
      this.earliestShowDate != undefined && this.latestShowDate != undefined
    );
  }

  // Only user can modify group
  showModifyGroupButton(): boolean {
    return (
      this.authService.isLoggedIn &&
      this.regGroupInfo != undefined &&
      this.regGroupInfo.groupLeaderUserId == this.authService.userID &&
      this.registerStatus < RegStatus.REGISTERED
    );
  }

  // Only non-group leader will need to accept an invitation from a leader
  showConfirmRegButton(): boolean {
    return (
      this.authService.isLoggedIn &&
      this.regGroupInfo != undefined &&
      !this.hasUserConfirmed &&
      this.registerStatus < RegStatus.REGISTERED
    );
  }

  // Only non-group leader will have the option to leave group
  showLeaveGroupButton(): boolean {
    return (
      this.authService.isLoggedIn &&
      this.regGroupInfo != undefined &&
      this.regGroupInfo.groupLeaderUserId != this.authService.userID &&
      this.registerStatus < RegStatus.REGISTERED
    );
  }
  // =========================================================
  // Routing
  // =========================================================
  handleRegisterButtonClick(): void {
    if (
      this.authService.isLoggedIn &&
      this.authService.isVerified &&
      this.regGroupInfo == undefined &&
      this.registerStatus == RegStatus.NOT_REGISTERED
    ) {
      this.spinnerShow();
      this.storeRegGroupService.modifyGroup = false;
      this.router.navigate(['/events', 'register', 'group']);
    }
  }

  handleQueueButtonClick(): void {
    // Only navigate if the user already has a group, and all members
    // in the group have confirmed, and that the queueIDs list is null.
    if (
      this.regGroupInfo?.hasAllUsersConfirmed &&
      this.regGroupInfo?.queueList?.length == 0 &&
      this.registerStatus == RegStatus.GROUP_CONFIRMED
    ) {
      this.spinnerShow();
      this.router.navigate(['/events', 'register', 'queue']);
    }
  }

  handleModifyGroupButtonClick(): void {
    // Only navigate if the user already has a group.
    if (
      this.authService.isLoggedIn &&
      this.regGroupInfo != undefined &&
      this.regGroupInfo.groupLeaderUserId == this.authService.userID &&
      this.registerStatus < RegStatus.REGISTERED
    ) {
      this.spinnerShow();
      this.storeRegGroupService.modifyGroup = true;
      this.storeRegGroupService.regGroup = this.regGroupInfo;

      this.router.navigate(['/events', 'register', 'group']);
    }
  }

  handleConfirmRegButtonClick(): void {
    if (
      this.authService.isLoggedIn &&
      this.regGroupInfo != undefined &&
      !this.hasUserConfirmed &&
      this.registerStatus < RegStatus.REGISTERED
    ) {
      this.spinnerShow();
      this.storeRegGroupService.confirmUser(
        this.authService.userID,
        this.eventID,
        this.regGroupInfo.regGroupID
      ).subscribe(
        (data: boolean) => {
          if (data === true){
            this._updateUserEventInfo();
          }
        },
        (error: Error) => {
          // TODO: Connection Error
          // TODO: Unauthorized error
          // TODO: Internal Server Error
          // TODO: Conflict error
          console.log(error);
          this.spinnerHide();
        }
      );
    }
  }

  handleLeaveGroupButtonClick(): void {
    if (
      this.authService.isLoggedIn &&
      this.regGroupInfo != undefined &&
      this.regGroupInfo.groupLeaderUserId != this.authService.userID &&
      this.registerStatus < RegStatus.REGISTERED
    ) {
      this.spinnerShow();
      this.storeRegGroupService.removeUserFromGroup(
        this.authService.userID,
        this.eventID,
        this.regGroupInfo.regGroupID
      ).subscribe(
        (data: boolean) => {
          if (data === true){
            this._updateUserEventInfo();
          }
        },
        (error: Error) => {
          // TODO: Connection Error
          // TODO: Unauthorized Error
          // TODO: Internal Server Error
          // TODO: Conflict Error
          console.log(error);
          this.spinnerHide();
        }
      );
    }

  }
  // ==========================================================
  // Utility functions
  // ==========================================================
  private _updateUserEventInfo(): void {
    this.userID = this.authService.userID; // update userID
    this._resetFields();
    if (this.userID == undefined) {
      this._setRegistrationStatusOfUser();
      this._mapRegStatusToRegStepper();
      this.spinnerHide();
      return;
    }
    // Load user's registration group and queues
    this._getUserRegGroupMemberInfo();
  }

  private _mapRegStatusToRegStepper(): number {
    switch (this.registerStatus) {
      case RegStatus.NOT_LOGGED_IN:
      case RegStatus.NOT_REGISTERED:
        return RegStepper.NOT_LOGGED_IN;

      case RegStatus.PENDING_CONFIRMATION:
      case RegStatus.GROUP_CONFIRMED:
        return RegStepper.PENDING_CONFIRMATION;

      case RegStatus.REGISTERED:
        return RegStepper.REGISTERED;

      case RegStatus.PURCHASED:
        return RegStepper.PURCHASED;

      default:
        throw new Error('Invalid registration status');
    }
  }

  private _setRegistrationStatusOfUser(): void {
    if (this.authService.userID == undefined) {
      this.registerStatus = RegStatus.NOT_LOGGED_IN;
      return;
    }

    if (this.regGroupInfo == undefined) {
      this.registerStatus = RegStatus.NOT_REGISTERED;
    } else if (!this.regGroupInfo.hasAllUsersConfirmed) {
      this.registerStatus = RegStatus.PENDING_CONFIRMATION;
      return;
    } else if (this.regGroupInfo.queueList?.length == 0) {
      this.registerStatus = RegStatus.GROUP_CONFIRMED;
    } else if (this.regGroupInfo.purchaseID == undefined) {
      this.registerStatus = RegStatus.REGISTERED;
    } else {
      this.registerStatus = RegStatus.PURCHASED;
    }
  }

  private _getUserRegGroupMemberInfo(): void {
    if (this.eventID == undefined || !this.authService.isLoggedIn) {
      this.registerStatus = RegStatus.NOT_LOGGED_IN;
      return;
    }
    this.getRegGroupService
      .getRegGroupOfUser(this.eventID, this.authService.userID)
      .subscribe(
        (data: any) => {
          // Find group leader and userInfo
          let userList: User[] = [];
          let groupLeaderId: string = '';

          // Load users
          for (let user of data.userInfoList) {
            // Find group leader of user's group
            if (user.groupLeader) {
              groupLeaderId = user.id;
            }
            // Store all group members of this user in a list.
            if (user.id != this.authService.userID) {
              let userObj = {
                userID: user.id,
                mobileNo: user.mobile,
                email: user.email,
                isVerified: true,
                confirmed: user.confirmed,
              };
              userList.push(userObj);
            } else {
              this.hasUserConfirmed = user.confirmed;
            }
          }

          // Load registered queues
          this.queueList = this._fillRegisteredQueues(data);

          this.regGroupInfo = {
            userGroup: userList,
            groupSize: userList.length + 1, // add the current user
            regGroupID: data.groupId,
            eventId: data.eventId,
            hasAllUsersConfirmed: data.hasAllUsersConfirmed,
            groupLeaderUserId: groupLeaderId,
            queueList: this.queueList,
          };

          // Set Registration Status of user
          this._setRegistrationStatusOfUser();

          // Set the stepper
          this.activeIndex = this._mapRegStatusToRegStepper();
          this.hasRegGroupInfoLoaded = true;
          this.spinnerHide();
        },
        (error: Error) => {
          console.log(error);
          this._setRegistrationStatusOfUser();
          this.activeIndex = this._mapRegStatusToRegStepper();
          this.hasRegGroupInfoLoaded = true;
          if (error.message == '400') {
            // User is not registered
          } else {
            // TODO: Internal Server Error

          }
          this.spinnerHide();
        }
      );
  }

  private _fillRegisteredQueues(data: any): QueueDTO[] {
    let queueList: QueueDTO[] = [];
    for (let queue of data.queueList) {
      let queueObj: QueueDTO = {
        showID: queue.showId,
        queueID: queue.queueId,
        queueStartTime: queue.startDateTime,
        queueEndTime: queue.endDateTime,
        location: (queue.locationName !== null)? queue.locationName : "Not specified"
      };
      queueList.push(queueObj);
    }
    return queueList;
  }

  private _resetFields(): void {
    this.regGroupInfo = undefined;
    this.hasUserConfirmed = false;
    this.registerStatus = RegStatus.NOT_REGISTERED;
    this.activeIndex = RegStepper.NOT_LOGGED_IN;
  }
}
