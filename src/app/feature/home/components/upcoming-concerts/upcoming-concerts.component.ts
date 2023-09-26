import { Event } from 'src/app/models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
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
    this.getEventInfoService.loadAllEvents().subscribe((data: any) => {
      // clean the data
      this.events = new Array();
      for (let eventData of data) {
        let event: Event = {
          eventID: eventData.id,
          name: eventData.name,
          countries: [],
          maxQueueable: eventData.maxQueueable,
          description: eventData.description,
          image: eventData.posterImagePath,
          isHighlighted: eventData.highlighted,
        };
        this.events.push(event);
      }

    });
  }

  handleButtonClick(eventID: string): void {
    // const eventSelected = this.getEventInfoService.getEventInfo(eventID);
    // if (eventSelected == undefined) return;
    // this.storeEventInfoService.eventInfo = {
    //   eventID: eventID,
    //   eventTitle: eventSelected.name,
    //   maxQueueable: eventSelected.maxQueueable,
    // };
    this.getEventInfoService.getEventInfo(eventID).subscribe((data: any) => {
      let event: Event = {
        eventID: data.id,
        name: data.name,
        countries: [],
        maxQueueable: data.maxQueueable,
        description: data.description,
        image: data.posterImagePath,
        isHighlighted: data.highlighted,
      };
      this.storeEventInfoService.eventInfo = {
        eventID: event.eventID,
        eventTitle: event.name,
        maxQueueable: event.maxQueueable,
      };
    });

    this.router.navigate(['/events', 'register', 'group']);
  }

  private _buildEventSummary(event: Event): void {
    let summaryStringBuilder = 'Coming to ';

    // Build event summary
    for (let i = 0; i < event.countries.length - 1; ++i) {
      summaryStringBuilder = summaryStringBuilder + event.countries[i] + ', ';
    }

    summaryStringBuilder +=
      'and ' + event.countries[event.countries.length - 1];
    event.summary = summaryStringBuilder + '!';
  }
}
