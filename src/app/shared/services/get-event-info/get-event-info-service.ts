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

  private _events: Map<string, Event> = new Map<string, Event>();
  private _carousellEvents: Map<string, Event> = new Map<string, Event>();

  loadAllCarousellEvents(): Observable<any> {

    return this.get("events/");
  }

  loadAllEvents(): Observable<any> {
    return this.get("events/");
  }

  getEventInfo(eventID: string): Event | undefined {
    if (this._events.size == 0){
      this._getAllEventData();
    }
    return this._events.get(eventID);
  }

  // private _getCarousellEventData(): Event[] {
  //   let carousellEvents: Event[] = [];
  //   for (let event of events) {
  //     if (event.isHighlighted) {
  //       this._buildEventSummary(event);
  //       carousellEvents.push(event);
  //     }
  //   }
  //   return carousellEvents;
  // }

  private _getAllEventData() {
    this.get('events/').subscribe(
      (data: any) => {
        console.log(data);
        for (let obj of data){
          console.log(obj);
          console.log(typeof obj);
          // let eventStr: string = JSON.parse(obj);
          // console.log(eventStr);

          let event: Event = {
            eventID: obj.id,
            name: obj.name,
            countries: [],
            maxQueueable: obj.maxQueueable,
            description: obj.description,
            image: obj.posterImagePath,
            isHighlighted: obj.isHighlighted
          }
          console.log("New Event Created = " + event.eventID);
          this._events.set(event.eventID, event);
          if (event.isHighlighted){
            this._carousellEvents.set(event.eventID, event);
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    )
    // await this.get("events/").then(
    //   (events: any) => {
    //     console.log(events);
    //     const eventsJSON = JSON.parse(events);
    //     for (let e of eventsJSON){
    //       console.log(e);
    //       let event = e as Event;
    //       this._events.set(event.eventID, event);
    //       if (event.isHighlighted){
    //         this._carousellEvents.set(event.eventID, event);
    //       }
    //     }
    //     console.log("Data loading complete");
    //   },
    // );
    // const promise = new Promise<void>((resolve, reject) => {
    //   this.get("events/").then({
    //     next: (res: any) => {
    //       console.log(res);

    //       resolve();
    //     },
    //     error: (err: any) => {
    //       this.handleError(err as HttpErrorResponse);
    //       reject(err);
    //     },
    //     complete: () => console.log("completed!")
    //   })
    // });
    // return promise;

  }

  private _getEventData(eventID: string): Event | undefined {
    return this._events.get(eventID);
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
