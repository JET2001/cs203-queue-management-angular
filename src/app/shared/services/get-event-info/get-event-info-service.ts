import { Injectable } from '@angular/core';
import { events } from 'src/app/mock-db/MockDB';
import { Event } from '../../../models/event';
@Injectable({
  providedIn: 'root',
})
export class GetEventInfoService {
  loadAllCarousellEvents(): Promise<Event[]> {
    return Promise.resolve(this._getCarousellEventData());
  }

  loadEvent(eventID: number): Promise<Event> {
    return Promise.resolve(this._getEventData(eventID));
  }

  private _getCarousellEventData(): Event[] {
    let carousellEvents: Event[] = [];
    for (let event of events) {
      if (event.isHighlighted) {
        this._buildEventSummary(event);
        carousellEvents.push(event);
      }
    }
    return carousellEvents;
  }

  private _getEventData(eventID: number): Event {
    return events[eventID];
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
