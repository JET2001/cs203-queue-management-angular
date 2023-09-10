import { Injectable } from '@angular/core';
import { Users } from 'src/app/mock-db/MockDB';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class GetUserInfoService {

  constructor() { }
  loadUserInfo(userID: number | undefined): Promise<User | undefined> {
    if(userID == undefined) return Promise.resolve(undefined);

    return Promise.resolve(this._getUserInfo(userID));
  }

  private _getUserInfo(userID: number): User | undefined {
    for (let user of Users){
      if (user.userID == userID) return user;
    }
    return undefined;
  }
}
