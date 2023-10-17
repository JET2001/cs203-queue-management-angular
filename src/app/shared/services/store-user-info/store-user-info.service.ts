import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import axios from 'axios';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class StoreUserInfoService extends BaseRestApiService {
  private mobile: string;
  private accountSid = 'ACe50a473d00b5eb4c962b151a8f24d088';
  private authToken = 'ecf7b891206889d628e1a4a8e572be61';
  private readonly sendOTPUrl =
    'https://verify.twilio.com/v2/Services/VA594afeed9149936830dab2e27e774b3d/Verifications';
  private readonly verifyOTPUrl =
    'https://verify.twilio.com/v2/Services/VA594afeed9149936830dab2e27e774b3d/VerificationCheck';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public createNewUser(email: string, mobile: string, password: string): void {
    this.post('register', {
      email: email,
      mobile: mobile,
      password: password,
    }).subscribe((value) => {
      console.log(value);
    });
  }

  public verifyEmail(token: string): Observable<any> {
    return this.post('auth/verification/', { token });
  }

  sendOtp(mobile: string) {
    this.mobile = mobile;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${this.accountSid}:${this.authToken}`
      ).toString('base64')}`,
    };
    const data = new URLSearchParams();
    data.append('To', mobile);
    data.append('Channel', 'sms');

    axios
      .post(this.sendOTPUrl, data, { headers })
      .then((response) => {
        console.log('Service created successfully:', response.data);
      })
      .catch((error) => {
        console.error(
          'Error creating service:',
          error.response ? error.response.data : error.message
        );
      });
  }

  public verifyOtp(otp: string): boolean {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${this.accountSid}:${this.authToken}`
      ).toString('base64')}`,
    };
    const data = new URLSearchParams();
    data.append('Code', otp);
    data.append('To', this.mobile);

    axios
      .post(this.verifyOTPUrl, data, { headers })
      .then((response) => {
        console.log('OTP Verified ', response.data);
      })
      .catch((error) => {
        console.error(
          'Error ',
          error.response ? error.response.data : error.message
        );
        return false;
      });
      return true;
  }
}
