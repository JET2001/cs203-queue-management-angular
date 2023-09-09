import { GetRegistrationGroupService } from './../../../../shared/services/get-registration-group.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info-service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';
import { Event } from 'src/app/models/event';
import { RegGroup } from 'src/app/models/reg-group';

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

  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private getEventInfoService: GetEventInfoService,
    private getRegGroupService: GetRegistrationGroupService
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

    this.getEventInfoService.loadEvent(this.eventID!).then(
      (event: Event) => this.eventInfo = event
    );

    this.getRegGroupService.getRegGroupOfUser(this.eventID, this.userID).then(
      (group: RegGroup | undefined) => this.userRegGroupInfo = group
    );

  }

  registerForGroup(): void {
    this.router.navigate(['/events', 'register','group']);
  }

  private _loadUserRegStatus(): void {

  }

}
