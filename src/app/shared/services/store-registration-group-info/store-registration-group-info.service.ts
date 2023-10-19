import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/app/core/constants/api-paths';
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

  public confirmUser(userID: string | undefined, eventID: string | undefined, groupID: string | undefined): Observable<any> {
    if (userID == "" || eventID == "" || groupID == ""){
      return new Observable<any>();
    }
    return this.put('events-register/group/event/user/confirm',
    {
      userId: userID,
      eventId: eventID,
      groupId: groupID
    });
  }

  public removeUserFromGroup(userID: string | undefined, eventID: string | undefined, groupID: string | undefined): Observable<any> {
    if (userID == undefined || eventID == undefined || groupID == undefined){
      return new Observable<any>();
    }
    let params = new HttpParams();
    params = params.append("userId", userID);
    params = params.append("eventId", eventID);
    params = params.append("groupId", groupID);

    // See definition of delete below
    return this.deleteWithParams("events-register/group/leave-group", params);
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
