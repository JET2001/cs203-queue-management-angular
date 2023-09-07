import { Injectable } from '@angular/core';

export interface EventInfoParams {
  eventID ?: number; // optional arguments
  userID ?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreEventInfoService {

  _eventInfo!: EventInfoParams;

  public get eventInfo(): EventInfoParams {
    return this._eventInfo;
  }
  public set eventInfo(params: EventInfoParams){
    this._eventInfo = params;
  }
}
