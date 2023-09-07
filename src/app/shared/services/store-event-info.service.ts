import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreEventInfoService {

  _eventID!: number;

  public get eventID(): number {
    return this._eventID;
  }
  public set eventID(eventID: number){
    this._eventID = eventID;
  }
}
