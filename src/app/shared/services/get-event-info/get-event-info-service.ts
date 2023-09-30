import { Injectable } from '@angular/core';
import { events } from 'src/app/mock-db/MockDB';
import { Event } from '../../../models/event';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
