import { Injectable } from '@angular/core';
import { RegGroups } from 'src/app/mock-db/MockDB';
import { RegGroup } from 'src/app/models/reg-group';

@Injectable({
  providedIn: 'root',
})
export class GetRegistrationGroupService {
  constructor() {}

  getRegGroupOfUser(
    eventID: number,
    userID: number | undefined
  ): Promise<RegGroup | undefined> {
    if (eventID == undefined || userID == undefined)
      return Promise.resolve(undefined);
    return Promise.resolve(this._getRegGroupOfUser(eventID, userID));
  }

  private _getRegGroupOfUser(
    eventID: number,
    userID: number
  ): RegGroup | undefined {
    for (let group of RegGroups) {
      if (group.eventID != eventID) continue;
      if (!(userID in group.userIDs)) continue;
      return group as RegGroup;
    }
    return undefined;
  }
}
