import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { Users } from 'src/app/mock-db/MockDB';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class GetUserInfoService extends BaseRestApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  loadUserInfo(email: string): Observable<any> {
    // console.log("mobile = " + mobile + "email = " + email);
    // let httpParams: HttpParams = new HttpParams();
    // httpParams = httpParams.append("email", email);httpParams = httpParams.append("mobile", mobile);

    // console.log("params= " + httpParams);
    return this.get('users/'+ email);
  }

  getUserID(email: string, mobile: string): Promise<string | undefined> {
    return Promise.resolve(this._getUserID(email, mobile));
  }

  private _getUserID(email: string, mobile: string): string | undefined {
    for (let user of Users) {
      if (user.email == email && user.mobileNo == mobile) return user.userID;
    }
    return undefined;
  }
}
