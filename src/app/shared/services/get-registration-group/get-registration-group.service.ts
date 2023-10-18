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
    if (eventID == "" || userID == undefined){
      return new Observable<any>();
    }
    return this.get('events-register/' + eventID + '/user/' + userID + '/group-info');
  }
}
