import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';

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

  existingMobileNumber(mobile: string): Observable<any> {
    mobile = mobile.replace('+', '0');
    return this.get('users/mobile/' + mobile);
  }

  getUserID(email: string, mobile: string): Observable<any> {
    return this.get(
      'users' +
        {
          email: email,
          mobile: mobile,
        }
    );
  }

  isPaymentVerified(email: string, mobile: string): Observable<any> {
    return this.get('users/is-payment-verified/' + email + '/' + mobile);
  }
}
