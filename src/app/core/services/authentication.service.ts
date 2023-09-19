import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/mock-db/MockDB';
import { GaVerificationPopupComponent } from 'src/app/shared/components/ga-verification-popup/ga-verification-popup.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _userID: number | undefined = undefined;

  constructor(private activeModal: NgbModal){
  }

  public get userID(): number | undefined {
    return this._userID;
  }

  public set userID(userID: number | undefined) {
    this._userID = userID;
    this.activeModal.open(GaVerificationPopupComponent, {centered: true});
  }
  public get isLoggedIn(): boolean {
    return this._userID != undefined;
  }
  public get isVerified(): boolean {
    return this.isLoggedIn && Users[this._userID!].isVerified;
  }

  public get email(): string | undefined {
    if (this._userID == undefined) return undefined;
    return Users[this._userID].email;
  }
}
