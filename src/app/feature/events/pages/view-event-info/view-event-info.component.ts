import { GetRegistrationGroupService } from './../../../../shared/services/get-registration-group.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info-service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';
import { Event } from 'src/app/models/event';
import { RegGroup } from 'src/app/models/reg-group';
import { GetShowInfoService, ShowInfo } from 'src/app/shared/services/get-show-info.service';

@Component({
  selector: 'app-view-event-info',
  templateUrl: './view-event-info.component.html',
  styleUrls: ['./view-event-info.component.scss']
})
export class ViewEventInfoComponent implements OnInit {
  eventID!: number | undefined;
  userID !: number | undefined;
  eventInfo!: Event;
  userRegGroupInfo !: RegGroup | undefined;
  showInfo!: ShowInfo[] | undefined;
  earliestShowDate!: Date;
  latestShowDate!: Date;

  // Utility variables
  datesAreValid: boolean = false;

  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private getEventInfoService: GetEventInfoService,
    private getRegGroupService: GetRegistrationGroupService,
    private getShowInfoService: GetShowInfoService
  ){}

  async ngOnInit() : Promise<void> {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.userID = this.storeEventInfoService.eventInfo.userID;
    // for debugging
    // this.eventID = Number(prompt("Enter an eventID (0 to 4)"));
    // this.userID = Number(prompt("Enter a userID (0 to 4)"));
    this.eventID = 0;
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
    this._calculateEarliestAndLatestShow();
    console.log("End of ngOninit!")
  }

  ngAfterContentChecked(): void{
    console.log("Earliest show = ", this.earliestShowDate);
    console.log("Latest show = ", this.latestShowDate);
  }

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

  private _isEarlier(timeA: Date, timeB: Date): boolean {
    return (timeA.getTime() - timeB.getTime()) < 0;
  }

  private _isLater(timeA: Date, timeB: Date): boolean {
    return (timeB.getTime() - timeA.getTime()) < 0;
  }
}
