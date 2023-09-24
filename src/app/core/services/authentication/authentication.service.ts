import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/mock-db/MockDB';
import { GaVerificationPopupComponent } from 'src/app/shared/components/ga-verification-popup/ga-verification-popup.component';
import { BaseRestApiService } from '../base-rest-api/base-rest-api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs';
import { baseURL } from '../../constants/api-paths';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseRestApiService {
  private _userID: string | undefined = undefined;
  constructor(
    private activeModal: NgbModal,
    private localStorageService: LocalStorageService,
    protected override http: HttpClient
  ) {
    super(http);
  }

  public get userID(): string | undefined {
    return this._userID;
  }

  public set userID(userID: string | undefined) {
    this._userID = userID;
  }
  public get isLoggedIn(): boolean {
    return this._userID != undefined;
  }
  public get isVerified(): boolean {
    if (!this.isLoggedIn) return false;

    for (let user of Users) {
      if (user.userID == this._userID) return user.isVerified;
    }
    return false;
  }

  public saveAuthToken(authToken: string) {
    this.localStorageService.userToken = authToken;
  }

  public get retrieveAuthToken(): string | null {
    return this.localStorageService.userToken;
  }

  public login(
    email: string,
    mobile: string,
    password: string
  ): Observable<any> {
    return this.post('users/auth/login', {
      // TODO: This is supposed to be in the HTTPHeader, but i forgot about it when i was developing the login API, this should be changed in subsequent versions.
      email: email,
      mobile: mobile,
      password: password,
    });
  }

  // We must modify this in order for the JWT Token to be interpreted correctly.
  protected override post(path: string, data: any): Observable<any> {
    let headers : HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // headers.set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(`${baseURL}/${path}`,
      data,
      { headers , responseType:'text'}
    )
  }

  public get email(): string | undefined {
    if (this._userID == undefined) return undefined;
    for (let user of Users) {
      if (user.userID == this._userID) return user.email;
    }
    return undefined;
  }

  public authenticateUser(): Promise<boolean> {
    this.activeModal.open(GaVerificationPopupComponent, { centered: true });
    return Promise.resolve(true);
  }
}
