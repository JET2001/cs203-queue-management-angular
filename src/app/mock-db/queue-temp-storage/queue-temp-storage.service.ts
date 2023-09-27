import { ShowDTO } from 'src/app/models/dto/shows-dto';
import { QueueDTO } from './../../models/dto/queues-dto';
import { Injectable } from '@angular/core';
import { Show } from 'src/app/models/show';

@Injectable({
  providedIn: 'root'
})
export class QueueTempStorageService {

  constructor() { }

  queueTimings: string[];
  showTimings: string[];
  locations: string[];

  public async loadQueuesForShows(data: any) : Promise<void> {
    this.queueTimings = new Array();
    this.showTimings = new Array();
    this.locations = new Array();
    for (let obj of data){
      for (let queue of obj.queues){
        this.queueTimings.push(queue.startDateTime);
        this.showTimings.push(obj.dateTime);
        this.locations.push(obj.locationName);
      }
    }
  }
  public get getQueueTimings(): string[] {
    return this.queueTimings;
  }

  public get getShowTimings(): string[] {
    return this.showTimings;
  }
  public get getLocations(): string[] {
    return this.locations;
  }
}
