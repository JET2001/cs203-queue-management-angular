import { Injectable } from '@angular/core';

export interface EventInfoParams {
  eventID?: string; // optional arguments
  eventTitle?: string;
  userID?: string;
  groupID?: string;
  queueID?: string[];
  maxQueueable?: number;
}

@Injectable({
  providedIn: 'root',
})
export class StoreEventInfoService {
  private _eventInfo: EventInfoParams = {};

  public get eventInfo(): EventInfoParams {
    return this._eventInfo;
  }
  public set eventInfo(params: EventInfoParams) {
    this._eventInfo = params;
  }
}
