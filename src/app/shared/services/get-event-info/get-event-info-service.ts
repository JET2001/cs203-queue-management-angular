import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { Event } from '../../../models/event';

@Injectable({
  providedIn: 'root',
})
export class GetEventInfoService extends BaseRestApiService {
  loadAllCarousellEvents(): Observable<any> {
    return this.get('events/highlighted');
  }

  loadAllEvents(): Observable<any> {
    return this.get('events/');
  }

  getEventInfo(eventID: string): Observable<any> {
    return this.get('events/' + eventID);
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
