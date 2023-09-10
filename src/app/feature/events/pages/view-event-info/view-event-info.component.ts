import { GetRegistrationGroupService } from './../../../../shared/services/get-registration-group.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info-service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';
import { Event } from 'src/app/models/event';
import { RegGroup } from 'src/app/models/reg-group';
import { GetShowInfoService, ShowInfo } from 'src/app/shared/services/get-show-info.service';
import { RegStatus } from '../../constants/reg-status';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view-event-info',
  templateUrl: './view-event-info.component.html',
  styleUrls: ['./view-event-info.component.scss']
})
export class ViewEventInfoComponent implements OnInit {
  eventID!: number | undefined;
  userID !: number | undefined;

  // Event information
  eventInfo!: Event;

  // Registration group information
  userRegGroupInfo !: RegGroup | undefined;
  confirmationOfMembers: Map<string, boolean> = new Map<string, boolean>();
  otherMemberEmailList: string[] = [];
  otherMemberConfirmList: number[] = [];
  hasUserConfirmed !: boolean;

  // Show Information
  showInfo!: ShowInfo[] | undefined;
  earliestShowDate!: Date;
  latestShowDate!: Date;

  // Utility variables
  datesAreValid: boolean = false;

  // Variables for registration status
  registerStatus: RegStatus = RegStatus.NOT_REGISTERED;
  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private getEventInfoService: GetEventInfoService,
    private getRegGroupService: GetRegistrationGroupService,
    private getShowInfoService: GetShowInfoService,
    private getUserInfoService: GetUserInfoService
  ){}

  async ngOnInit() : Promise<void> {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.userID = this.storeEventInfoService.eventInfo.userID;
    // for debugging
    // this.eventID = Number(prompt("Enter an eventID (0 to 4)"));
    // this.userID = Number(prompt("Enter a userID (0 to 4)"));
    this.eventID = 1;
    this.userID = 0;
    if (this.eventID == undefined){
      this.router.navigate(['/home']);
    }

    if (this.userID == undefined){
      // TODO: Should prompt for login once log in is complete.
    }
    console.log("eventID = ", this.eventID, "userID = ", this.userID);
    await this.getEventInfoService.loadEvent(this.eventID).then(
      (event: Event) => {
        this.eventInfo = event;
        // console.log("I am done!");
      }
    );
    // console.log("Event info = ", this.eventInfo);
    await this.getShowInfoService.loadShowInfo(this.eventID).then(
      (showInfo: ShowInfo[] | undefined) => {
        this.showInfo = showInfo;
        this._calculateEarliestAndLatestShow();
        this.datesAreValid = true;
        // console.log("I am done2!");
      }
    );
    // console.log("Show Info = ", this.showInfo);
    await this.getRegGroupService.getRegGroupOfUser(this.eventID, this.userID).then(
      (group: RegGroup | undefined) => this.userRegGroupInfo = group
    );
    console.log("Registration Group info = ", this.userRegGroupInfo);

    this._getRegistrationStatusOfUser();

    if (this.userRegGroupInfo){
      const groupUserIDs = this.userRegGroupInfo.userIDs;
      for(let i = 0; i < groupUserIDs.length; ++i){
        if(groupUserIDs[i] != this.userID){
          await this.getUserInfoService.loadUserInfo(groupUserIDs[i]).then(
            (user: User | undefined) => {
              if (user == undefined) {
                console.log("User is unexpectedly undefined");
                return;
              }
              this.confirmationOfMembers.set(user.email, (this.userRegGroupInfo!.confirmed[i] == 1));
              this.otherMemberEmailList.push(user.email);
              this.otherMemberConfirmList.push(this.userRegGroupInfo!.confirmed[i]);
          });
        } else {
          this.hasUserConfirmed = (this.userRegGroupInfo.confirmed[i] == 1);
        }
      }
    }

    console.log("End of ngOninit!")
  }

  showGroupMembersInfo(): boolean {
    return this.registerStatus != RegStatus.NOT_REGISTERED;
  }
  // ngAfterContentChecked(): void{
  //   console.log("Earliest show = ", this.earliestShowDate);
  //   console.log("Latest show = ", this.latestShowDate);
  // }

  registerForGroup(): void {
    this.router.navigate(['/events', 'register','group']);
  }

  private _calculateEarliestAndLatestShow(): void {
    if(this.showInfo == undefined || this.showInfo.length == 0) {
      this.earliestShowDate = new Date(0);
      this.latestShowDate = new Date(0);
      return;
    }

    this.earliestShowDate = this.showInfo[0].showDateTime;
    this.latestShowDate = this.showInfo[0].showDateTime;
    for (let show of this.showInfo){
      // Set earliest time
      if(this._isEarlier(show.showDateTime, this.earliestShowDate)){
        this.earliestShowDate = show.showDateTime;
      }
      // Set latest time
      else if (this._isLater(show.showDateTime, this.latestShowDate)){
        this.latestShowDate = show.showDateTime;
      }
      else;
    }
    console.log("Calculation complete!");
  }

  private _getRegistrationStatusOfUser(): void {
    if(this.userRegGroupInfo == undefined) {
      this.registerStatus = RegStatus.NOT_REGISTERED;
    }
    else if (!this.userRegGroupInfo.hasAllUsersConfirmed){
      this.registerStatus = RegStatus.PENDING_CONFIRMATION;
      return;
    }
    else if (this.userRegGroupInfo.queueIDs == undefined){
      this.registerStatus = RegStatus.GROUP_CONFIRMED;
    }
    else if (this.userRegGroupInfo.purchaseID == undefined){
      this.registerStatus = RegStatus.REGISTERED;
    } else {
      this.registerStatus = RegStatus.PURCHASED;
    }
  }

  private _isEarlier(timeA: Date, timeB: Date): boolean {
    return (timeA.getTime() - timeB.getTime()) < 0;
  }

  private _isLater(timeA: Date, timeB: Date): boolean {
    return (timeB.getTime() - timeA.getTime()) < 0;
  }
}
