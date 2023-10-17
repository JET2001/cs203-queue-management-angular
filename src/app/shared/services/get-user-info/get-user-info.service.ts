import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { Users } from 'src/app/mock-db/MockDB';

@Injectable({
  providedIn: 'root',
})
export class GetUserInfoService extends BaseRestApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  loadUserInfo(email: string): Observable<any> {
    return this.get('users/' + email);
  }

  // existingMobileNumber(mobile: string): Observable<any> {
  existingMobileNumber(mobile: string): Promise<boolean> {
    return Promise.resolve(this._checkMobile(mobile));
  }

  private _checkMobile(mobile: string): boolean {
    for (let user of Users) {
      if (user.mobileNo === mobile) {
        return true;
      }
    }
    return false;
  }

  getUserID(email: string, mobile: string): Promise<string | undefined> {
    return Promise.resolve(this._getUserID(email, mobile));
  }

  private _getUserID(email: string, mobile: string): string | undefined {
    for (let user of Users) {
      if (user.email === email && user.mobileNo === mobile) return user.userID;
    }
    return undefined;
  }
}
