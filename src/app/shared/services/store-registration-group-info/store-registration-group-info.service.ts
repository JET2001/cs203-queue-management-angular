import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreRegistrationGroupInfoService {

  private _modifyGroup: boolean = false;
  private _emailList: string[] = [];
  private _mobileList: string[] = [];

  public set modifyGroup(value: boolean) {
    this._modifyGroup = value;
  }
  public get modifyGroup(): boolean {
    return this._modifyGroup;
  }
  public set emailList(emails: string[]) {
    this._emailList = emails;
  }
  public get emailList(): string[] {
    return this._emailList;
  }

  public set mobileList(mobiles: string[]) {
    this._mobileList = mobiles;
  }
  public get mobileList(): string[] {
    return this._mobileList;
  }
}
