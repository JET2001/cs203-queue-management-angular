import { Injectable } from '@angular/core';
import { locations, queues, shows } from 'src/app/mock-db/MockDB';
import { Queue } from 'src/app/models/queue';
import { Location } from '../../../models/location';
import { Show } from '../../../models/show';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShowInfo extends Show, Queue, Location {}

@Injectable({
  providedIn: 'root',
})
export class GetShowInfoService extends BaseRestApiService{
  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Load all shows for this event, load queue timings, location, and seat category.
  loadShowInfo(eventID: string): Observable<any> {
    return this.get("events/" + eventID + "/shows");

  }



  // loadShowInfo(eventID: string | undefined): Promise<ShowInfo[] | undefined> {
  //   if (eventID == undefined) return Promise.resolve(undefined);

  //   return Promise.resolve(this._getAllShowInfo(eventID));
  // }

  private _getAllShowInfo(eventID: string): ShowInfo[] {
    let showInfo: ShowInfo[] = [];
    for (let show of shows) {
      if (show.eventID == eventID) {
        let location: Location | undefined = this._getLocationOfShow(
          show.locationID
        );
        if (location == undefined) {
          location = { locationID: "NOT_SET", locationName: 'NOT_SET' };
        }
        let queue: Queue | undefined = this._getQueueTimesForShow(
          show.eventID,
          show.locationID
        );
        if (queue == undefined) {
          // queue is not set.
          queue = {
            eventID: show.eventID,
            showID: show.showID,
            queueID: "queue_1",
            queueStartTime: new Date(0),
            queueEndTime: new Date(0),
          };
        }
        const showInfoItem: ShowInfo = {
          eventID: show.eventID,
          showID: show.showID,
          showDateTime: show.showDateTime,
          locationID: show.locationID,
          locationName: location.locationName,
          queueID: queue.queueID,
          queueStartTime: queue.queueStartTime,
          queueEndTime: queue.queueEndTime,
        };

        showInfo.push(showInfoItem);
      }
    }
    return showInfo;
  }

  private _getLocationOfShow(locationID: string): Location | undefined {
    for (let location of locations) {
      if (locationID == location.locationID) return location;
    }
    return undefined;
  }

  private _getQueueTimesForShow(
    eventID: string,
    showID: string
  ): Queue | undefined {
    for (let queue of queues) {
      if (eventID == queue.eventID && showID == queue.showID) {
        return queue;
      }
    }
    return undefined;
  }
}
