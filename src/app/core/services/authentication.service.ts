import { Injectable } from '@angular/core';
import { Users } from 'src/app/mock-db/MockDB';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userID: number | undefined = undefined;

  public get userID(): number|undefined {
    return this._userID;
  }

  public set userID(userID: number | undefined) {
    this._userID = userID;
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
