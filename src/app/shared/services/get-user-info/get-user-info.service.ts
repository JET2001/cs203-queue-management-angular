import { Injectable } from '@angular/core';
import { Users } from 'src/app/mock-db/MockDB';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class GetUserInfoService {
  constructor() {}

  loadUserInfo(userID: string | undefined): Promise<User | undefined> {
    if (userID == undefined) return Promise.resolve(undefined);

    return Promise.resolve(this._getUserInfo(userID));
  }

  getUserID(email: string, mobile: string): Promise<string | undefined> {
    return Promise.resolve(this._getUserID(email, mobile));
  }

  private _getUserInfo(userID: string): User | undefined {
    for (let user of Users) {
      if (user.userID == userID) return user;
    }
    return undefined;
  }

  private _getUserID(email: string, mobile: string): string | undefined {
    for (let user of Users) {
      if (user.email == email && user.mobileNo == mobile) return user.userID;
    }
    return undefined;
  }
}
