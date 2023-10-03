import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class StoreUserInfoService extends BaseRestApiService {
  private email: string;
  private mobile: string;
  private password: string;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public storeUserInfo(email: string, mobile: string, password: string) {
    this.email = email;
    this.mobile = mobile;
    this.password = password;
  }
}
