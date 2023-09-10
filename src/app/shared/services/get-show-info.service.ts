import { Location } from './../../models/location';
import { locations, queues, shows } from 'src/app/mock-db/MockDB';
import { Show } from './../../models/show';
import { Injectable } from '@angular/core';
import { Queue } from 'src/app/models/queue';


export interface ShowInfo extends Show, Queue, Location {}

@Injectable({
  providedIn: 'root'
})
export class GetShowInfoService {

  constructor() { }

  // Load all shows for this event, load queue timings, location, and seat category.
  loadShowInfo(eventID: number | undefined): Promise<ShowInfo[] | undefined> {
    if (eventID == undefined) return Promise.resolve(undefined);

    return Promise.resolve(this._getAllShowInfo(eventID));
  }

  private _getAllShowInfo(eventID: number): ShowInfo[] {
    let showInfo: ShowInfo[] = [];
    for (let show of shows){
      if (show.eventID == eventID) {
        let location : Location | undefined = this._getLocationOfShow(show.locationID);
        if (location == undefined){
          location = {locationID: 1000, locationName: "NOT_SET"};
        }
        let queue: Queue | undefined = this._getQueueTimesForShow(show.eventID, show.locationID);
        if (queue == undefined){ // queue is not set.
          queue = {eventID: show.eventID, showID: show.showID, queueID: -1, queueStartTime: new Date(0), queueEndTime: new Date(0)};
        }
        const showInfoItem : ShowInfo = {
          eventID: show.eventID,
          showID: show.showID,
          showDateTime: show.showDateTime,
          locationID: show.locationID,
          locationName: location.locationName,
          queueID: queue.queueID,
          queueStartTime: queue.queueStartTime,
          queueEndTime: queue.queueEndTime
        };

        showInfo.push(showInfoItem);
      }
    }
    return showInfo;
  }

  private _getLocationOfShow(locationID: number): Location | undefined  {
    for (let location of locations){
      if (locationID == location.locationID) return location;
    }
    return undefined;
  }

  private _getQueueTimesForShow(eventID: number, showID: number): Queue | undefined {
    for (let queue of queues){
      if(eventID == queue.eventID && showID == queue.showID){
        return queue;
      }
    }
    return undefined;
  }

}
