import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { RegGroupDTOReq, RegGroupDTOResp } from 'src/app/models/dto/reg-group-dto';

@Injectable({
  providedIn: 'root',
})
export class StoreRegistrationGroupInfoService extends BaseRestApiService{
  constructor(protected override http : HttpClient){
    super(http);
  }
  private _regGroupDTO: RegGroupDTOResp | undefined = undefined;

  private _modifyGroup: boolean = false;
  private _emailList: string[] = [];
  private _mobileList: string[] = [];

  public saveGroup(email: string[], mobile: string[], userEmail: string, eventId: string) : Observable<any>{
    const regGroupDTO: RegGroupDTOReq = {
      groupLeaderEmail: userEmail,
      eventId: eventId,
      userGroup: []
    };

    for (let i = 0; i < email.length; ++i){
      regGroupDTO.userGroup.push({
        email: email[i], mobile: mobile[i]
      });
    }

    return this.post('event-register/group', regGroupDTO);
  }


  public set regGroup(regGroup: RegGroupDTOResp | undefined) {
    this._regGroupDTO = regGroup;
    console.log("SAVED: " + this._regGroupDTO);
  }

  public get regGroup(): RegGroupDTOResp | undefined {
    return this._regGroupDTO;
  }


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
