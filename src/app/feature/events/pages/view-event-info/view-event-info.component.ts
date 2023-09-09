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

  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private getEventInfoService: GetEventInfoService,
    private getRegGroupService: GetRegistrationGroupService,
    private getShowInfoService: GetShowInfoService
  ){}

  ngOnInit(): void {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.userID = this.storeEventInfoService.eventInfo.userID;
    // for debugging
    this.eventID = Number(prompt("Enter an eventID (0 to 4)"));
    this.userID = Number(prompt("Enter a userID (0 to 4)"));

    if (this.eventID == undefined){
      this.router.navigate(['/home']);
    }

    if (this.userID == undefined){
      // TODO: Should prompt for login once log in is complete.
    }
    console.log("eventID = ", this.eventID, "userID = ", this.userID);
    this.getEventInfoService.loadEvent(this.eventID!).then(
      (event: Event) => {
        this.eventInfo = event
        console.log("I am done!");
      }
    );

    this.getShowInfoService.loadShowInfo(this.eventID!).then(
      (showInfo: ShowInfo[] | undefined) => {
        this.showInfo = showInfo;
        console.log("I am done2!");
      }
    );

    this.getRegGroupService.getRegGroupOfUser(this.eventID, this.userID).then(
      (group: RegGroup | undefined) => this.userRegGroupInfo = group
    );

    // console.log("Event info = ", this.eventInfo);
    // console.log("Show Info = ", this.showInfo);
    // console.log("Registration Group info = ", this.userRegGroupInfo);
  }

  ngAfterViewChecked(): void{
    console.log("Event info = ", this.eventInfo);
    console.log("Show Info = ", this.showInfo);
    console.log("Registration Group info = ", this.userRegGroupInfo);
  }

  registerForGroup(): void {
    this.router.navigate(['/events', 'register','group']);
  }

  private _loadUserRegStatus(): void {

  }

}
