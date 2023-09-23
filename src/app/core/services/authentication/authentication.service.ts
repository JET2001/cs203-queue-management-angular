import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/mock-db/MockDB';
import { GaVerificationPopupComponent } from 'src/app/shared/components/ga-verification-popup/ga-verification-popup.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _userID: string | undefined = undefined;
  private _authToken: string | undefined = undefined;

  constructor(private activeModal: NgbModal) {}

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

    for (let user of Users){
      if (user.userID == this._userID) return (user.isVerified);
    }
    return false;
  }

  public get email(): string | undefined {
    if (this._userID == undefined) return undefined;
    for (let user of Users){
      if (user.userID == this._userID) return user.email;
    }
    return undefined;
  }

  public authenticateUser(): Promise<boolean> {
    this.activeModal.open(GaVerificationPopupComponent, { centered: true });
    return Promise.resolve(true);
  }

  public set authToken(authToken: string | undefined) {
    this._authToken = authToken;
  }

  public get authToken(): string | undefined {
    return this._authToken;
  }
}