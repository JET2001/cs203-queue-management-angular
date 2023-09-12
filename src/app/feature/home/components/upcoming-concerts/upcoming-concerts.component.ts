import { Event } from 'src/app/models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';

@Component({
  selector: 'app-upcoming-concerts',
  templateUrl: './upcoming-concerts.component.html',
  styleUrls: ['./upcoming-concerts.component.scss'],
})
export class UpcomingConcertsComponent implements OnInit {
  @Input() userID : number | undefined = undefined;
  events: Event[];
  constructor(
    private getEventInfoService: GetEventInfoService,
    private storeEventInfoService: StoreEventInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEventInfoService.loadAllEvents().then((events) => {
      this.events = events;
    });
  }

  handleButtonClick(eventID: number): void {
    this.storeEventInfoService.eventInfo = {
      eventID: eventID,
      userID: this.userID
    };
    this.router.navigate(['/events']);
  }
}
