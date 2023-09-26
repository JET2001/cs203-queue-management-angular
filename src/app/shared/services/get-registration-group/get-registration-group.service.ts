import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { RegGroups } from 'src/app/mock-db/MockDB';
import { RegGroup } from 'src/app/models/reg-group';

@Injectable({
  providedIn: 'root',
})
export class GetRegistrationGroupService extends BaseRestApiService{

  getRegGroupOfUser(
    eventID: string,
    userID: string | undefined
  ): Observable<any> {
    // if (eventID == undefined || userID == undefined)
    //   return Promise.resolve(undefined);
    // return Promise.resolve(this._getRegGroupOfUser(eventID, userID));
    return this.get('events-register/' + eventID + '/user/' + userID + 'group-info');
  }

  // private _getRegGroupOfUser(
  //   eventID: string,
  //   userID: string
  // ): RegGroup | undefined {
  //   for (let group of RegGroups) {
  //     if (group.eventID != eventID) continue;
  //     if (!(userID in group.userIDs)) continue;
  //     return group as RegGroup;
  //   }
  //   return undefined;
  // }
}
