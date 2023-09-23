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
  @Input() userID: string | undefined = undefined;
  events: Event[];
  constructor(
    private getEventInfoService: GetEventInfoService,
    private storeEventInfoService: StoreEventInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventsIterator = this.getEventInfoService.loadAllEvents().values();

    for (let event of eventsIterator) {
      this.events.push(event);
    }
  }

  handleButtonClick(eventID: string): void {
    const eventSelected = this.getEventInfoService.getEventInfo(eventID);
    if (eventSelected == undefined) return;
    this.storeEventInfoService.eventInfo = {
      eventID: eventID,
      eventTitle: eventSelected.name,
      maxQueueable: eventSelected.maxQueueable,
    };

    this.router.navigate(['/events', 'register', 'group']);
  }
}
