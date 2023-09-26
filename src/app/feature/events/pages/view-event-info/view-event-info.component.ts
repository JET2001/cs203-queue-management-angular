import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { RegGroup } from 'src/app/models/reg-group';
import { User } from 'src/app/models/user';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event-info-service';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import {
  GetShowInfoService,
  ShowInfo,
} from 'src/app/shared/services/get-show-info/get-show-info.service';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { RegStatus, RegStepper } from '../../constants/reg-status';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-event-info',
  templateUrl: './view-event-info.component.html',
  styleUrls: ['./view-event-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewEventInfoComponent implements OnInit {
  eventID!: string | undefined;
  userID!: string | undefined;

  // Event information
  eventInfo!: Event;

  // Registration group information
  userRegGroupInfo!: RegGroup | undefined;
  otherMemberEmailList: string[] = [];
  otherMemberMobileList: string[] = [];
  otherMemberConfirmList: number[] = [];
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
  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private getEventInfoService: GetEventInfoService,
    private getRegGroupService: GetRegistrationGroupService,
    private getShowInfoService: GetShowInfoService,
    private getUserInfoService: GetUserInfoService,
    private authService: AuthenticationService,
    private storeRegGroupService: StoreRegistrationGroupInfoService,
    private messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
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

    

    // const temp = this.getEventInfoService.getEventInfo(this.eventID);
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
      });
    // if (temp == undefined) {
    //   this.router.navigate(['/home']);
    //   return;
    // }
    // this.eventInfo = temp;

    this.hasEventLoaded = true;

    await this._updateUserEventInfo();
  }

  // ===========================================
  // Handle case where user logs in and logs out from the View Events page
  // ===========================================
  async handleUserLoginLogoutChange(): Promise<void> {
    await this._updateUserEventInfo();
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

  datesAreValid(): boolean {
    return (
      this.earliestShowDate != undefined && this.latestShowDate != undefined
    );
  }

  // =========================================================
  // Routing
  // =========================================================
  handleRegisterButtonClick(): void {
    if (this.userRegGroupInfo == undefined) {
      this.router.navigate(['/events', 'register', 'group']);
    }
  }

  handleNextStepsButtonClick(): void {
    // Only navigate if the user already has a group, and all members
    // in the group have confirmed, and that the queueIDs list is null.
    if (
      this.userRegGroupInfo != undefined &&
      this.userRegGroupInfo.hasAllUsersConfirmed &&
      this.userRegGroupInfo.queueIDs == undefined
    ) {
      this.router.navigate(['/events', 'register', 'queue']);
    }
  }

  handleModifyGroupButtonClick(): void {
    // Only navigate if the user already has a group.
    if (this.userRegGroupInfo != undefined) {
      this.storeRegGroupService.modifyGroup = true;

      this.router.navigate(['/events', 'register', 'group']);
    }
  }
  // ==========================================================
  // Utility functions
  // ==========================================================
  private async _updateUserEventInfo(): Promise<void> {
    this.userID = this.authService.userID; // update userID
    this._resetFields();

    this.getRegGroupService
      .getRegGroupOfUser(this.eventID!, this.userID)
      .subscribe((regGroup: any) => {
        this.userRegGroupInfo = regGroup;
      });

    // Registration status of the user affects what button the user sees
    // ie. to "REGISTER", "PENDING CONFIRMATION", "REGISTERED" etc.
    // see reg-status.ts file for the statuses.
    this._getRegistrationStatusOfUser();

    this.activeIndex = this._mapRegStatusToRegStepper();
    await this._getUserRegGroupMemberInfo();
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

  private _calculateEarliestAndLatestShow(): void {
    if (this.showInfo == undefined || this.showInfo.length == 0) {
      this.earliestShowDate = new Date(0);
      this.latestShowDate = new Date(0);
      return;
    }
    let earliestShow = this.showInfo[0].showDateTime;
    let latestShow = this.showInfo[0].showDateTime;

    for (let show of this.showInfo) {
      // Set earliest time
      if (this._isEarlier(show.showDateTime, earliestShow)) {
        earliestShow = show.showDateTime;
      }
      // Set latest time
      else if (this._isLater(show.showDateTime, latestShow)) {
        latestShow = show.showDateTime;
      } else;
    }
    this.earliestShowDate = earliestShow;
    this.latestShowDate = latestShow;
  }

  private _getRegistrationStatusOfUser(): void {
    if (this.authService.userID == undefined) {
      this.registerStatus = RegStatus.NOT_LOGGED_IN;
      return;
    }

    if (this.userRegGroupInfo == undefined) {
      this.registerStatus = RegStatus.NOT_REGISTERED;
    } else if (!this.userRegGroupInfo.hasAllUsersConfirmed) {
      this.registerStatus = RegStatus.PENDING_CONFIRMATION;
      return;
    } else if (this.userRegGroupInfo.queueIDs == undefined) {
      this.registerStatus = RegStatus.GROUP_CONFIRMED;
    } else if (this.userRegGroupInfo.purchaseID == undefined) {
      this.registerStatus = RegStatus.REGISTERED;
    } else {
      this.registerStatus = RegStatus.PURCHASED;
    }
  }

  private async _getUserRegGroupMemberInfo(): Promise<void> {
    if (this.userRegGroupInfo) {
      const groupUserIDs = this.userRegGroupInfo.userIDs;
      for (let i = 0; i < groupUserIDs.length; ++i) {
        if (groupUserIDs[i] != this.userID) {
          await this.getUserInfoService
            .loadUserInfo(groupUserIDs[i])
            .then((user: User | undefined) => {
              if (user == undefined) {
                return;
              }
              this.otherMemberEmailList.push(user.email);
              this.otherMemberConfirmList.push(
                this.userRegGroupInfo!.confirmed[i]
              );
              this.otherMemberMobileList.push(user.mobileNo);

              this.storeRegGroupService.emailList = this.otherMemberEmailList;
              this.storeRegGroupService.mobileList = this.otherMemberMobileList;
            });
        } else {
          this.hasUserConfirmed = this.userRegGroupInfo.confirmed[i] == 1;
        }
      }
    }
  }

  private _isEarlier(timeA: Date, timeB: Date): boolean {
    return timeA.getTime() - timeB.getTime() < 0;
  }

  private _isLater(timeA: Date, timeB: Date): boolean {
    return timeB.getTime() - timeA.getTime() < 0;
  }

  private _resetFields(): void {
    this.userRegGroupInfo = undefined;
    this.otherMemberEmailList = [];
    this.otherMemberMobileList = [];
    this.otherMemberConfirmList = [];
    this.hasUserConfirmed = false;
  }
}
