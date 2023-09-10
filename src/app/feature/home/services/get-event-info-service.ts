import { Injectable } from '@angular/core';
import { Event } from '../../../models/event';
import { events } from 'src/app/mock-db/MockDB';
@Injectable({
  providedIn: 'root',
})
export class GetEventInfoService {
  loadAllCarousellEvents() : Promise<Event[]> {
    return Promise.resolve(this.getCarousellEventData());
  }

  loadEvent(eventID: number): Promise<Event> {
    return Promise.resolve(this.getEventData(eventID));
  }

  private getCarousellEventData(): Event[] {
    let carousellEvents : Event[] = [];
    for (let event of events){
      if (event.isHighlighted){
        this.buildEventSummary(event);
        carousellEvents.push(event);
      }
    }
    return carousellEvents;
  }

  private getEventData(eventID: number): Event {
    return events[eventID];
  }

  private buildEventSummary(event: Event): void {
    let summaryStringBuilder = "Coming to "
    console.log(summaryStringBuilder);

    // Build event summary
    for (let i = 0; i < event.countries.length -1; ++i){
      summaryStringBuilder = summaryStringBuilder + event.countries[i] + ", ";
    }

    summaryStringBuilder += "and " + event.countries[event.countries.length - 1];
    event.summary = summaryStringBuilder + "!";
  }
}
