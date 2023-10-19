import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { RegGroup } from 'src/app/models/reg-group';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { Observable, ReplaySubject, of } from 'rxjs';
import { User } from 'src/app/models/user';
import {  RegGroupDTOResp } from 'src/app/models/dto/reg-group-dto';
import { MAX_USERS_IN_GROUP } from '../../constants/event-register-constants';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.scss'],
})
export class GroupRegistrationComponent implements OnInit {
  // Fields
  eventID!: string | undefined;
  groupID!: string | undefined;
  eventTitle!: string | undefined;
  verified: boolean;
  keyStrokeDetected: boolean = false;

  // Parameters for modify group
  regGroupInfo !: RegGroupDTOResp | undefined;
  modifyGroup: boolean = false;

  // Invitees
  invitee1: FormControl[] = [
    new FormControl<string>(''),
    new FormControl<string>(''),
  ];
  invitee2: FormControl[] = [
    new FormControl<string>(''),
    new FormControl<string>(''),
  ];
  invitee3: FormControl[] = [
    new FormControl<string>(''),
    new FormControl<string>(''),
  ];
  invitees: FormControl[][] = [this.invitee1, this.invitee2, this.invitee3];
  inviteeVerified: (boolean | undefined)[] = [undefined, undefined, undefined];

  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private authService: AuthenticationService,
    private router: Router,
    private getRegInfoService: GetRegistrationGroupService,
    private storeRegGroupService: StoreRegistrationGroupInfoService,
    private getUserInfoService: GetUserInfoService
  ) {}

  async ngOnInit(): Promise<void> {
    // User, eventID should have been set and verified in events-register guard.
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.eventTitle = this.storeEventInfoService.eventInfo.eventTitle;
    this.verified = false;

    this.regGroupInfo = this.storeRegGroupService.regGroup;
    this.modifyGroup = this.storeRegGroupService.modifyGroup;

    // In case user has a group, but wants to change group.
    if (this.storeRegGroupService.modifyGroup && this.regGroupInfo !== undefined) {

      // load all fields into the original positions
      for (let i = 0; i < this.regGroupInfo.userGroup.length; ++i) {
        let user: User = this.regGroupInfo.userGroup[i];
        this.invitees[i][0].setValue(user.email);
        let userMobile: string = "+".concat(user.mobileNo.substring(1));
        this.invitees[i][1].setValue(userMobile);
      }
    }
  }

  confirm(): void {
    // Save to DB
    const emailList: string[] = [];
    const mobileList: string[] = [];
    for(let invitee of this.invitees){ //invitee is of type formcontrol
      emailList.push(invitee[0].value);
      mobileList.push(invitee[1].value);
    }
    // Load the user's ID
    const user: User = this.authService.user!; // definitely won't be null, because of the authguard.
    emailList.push(user.email);
    mobileList.push(user.mobileNo);

    const eventID : string = this.storeEventInfoService.eventInfo.eventID!; // won't be null, because of the auth guard.

    this.storeRegGroupService.saveGroup(emailList, mobileList, user.email, eventID).subscribe(
      (data: any) => {
        // const userRegGroup : RegGroupDTOResp = {
        //   regGroupID: data.id,
        //   eventId: data.eventId,
        //   groupLeaderUserId: data.groupLeaderId,
        //   groupLeaderEmail: data.groupLeaderEmail,
        //   groupSize: data.groupSize,
        //   userGroup: data.userGroup
        // };
        // this.storeRegGroupService.regGroup = userRegGroup;

        this.router.navigate(['/events']);
      },
      (error: Error) => {
        // console.log(error.message);
        this.router.navigate(['/events']);
      }
    );
  }

  backToConcert(): void {
    this.router.navigate(['/events']);
  }

  onTextChange(): void {
    // console.log("text changed");
    this.verified = false;
  }

  verify(): void {
    setTimeout(() => {
      try {
        for (let inviteeIdx = 0; inviteeIdx < MAX_USERS_IN_GROUP; ++inviteeIdx){
          this.inputIsValid(inviteeIdx).subscribe(
            (data: boolean | undefined) => {
              this.inviteeVerified[inviteeIdx] = data;
              console.log("Verified "+ inviteeIdx + ": " + data);
            },
            (error: Error) => {
              this.inviteeVerified[inviteeIdx] = false;
              console.log("Error " + inviteeIdx);
              console.log(error);
            }
          );
        }
        console.log("Verification complete!");
      } catch (error) {
        console.error('An error occurred in verify():', error);
      }
    }, 5000);
    // try {
    //   for (let inviteeIdx = 0; inviteeIdx < MAX_USERS_IN_GROUP; ++inviteeIdx){
    //     this.inputIsValid(inviteeIdx).subscribe(
    //       (data: boolean | undefined) => {
    //         this.inviteeVerified[inviteeIdx] = data;
    //         console.log("Verified "+ inviteeIdx);
    //       },
    //       (error: Error) => {
    //         this.inviteeVerified[inviteeIdx] = false;
    //         console.log("Error " + inviteeIdx);
    //       }
    //     );
    //   }
    //   console.log("Verification complete!");
    // } catch (error) {
    //   console.error('An error occurred in verify():', error);
    // }
  }

  isGroupVerified(): boolean {
    for (let status of this.inviteeVerified){
      if (status !== true) return false;
    }
    return true;
  }

  inputIsValid(inviteeNum: number): Observable<boolean | undefined> {
    console.log("UserEmail = ", inviteeNum, ": ", this.invitees[inviteeNum][0].value);
    console.log("UserMobile - ", inviteeNum, ": ", this.invitees[inviteeNum][1].value);
    // Case 1: if both fields are empty, there can be no invitation. return true
    if (this._userInfoIsEmpty(inviteeNum)) {
      console.log("invitee " + inviteeNum + " is empty!");
      return of(true);
    }

    // Case 2: if one field is empty, input is incomplete. return false
    if (!this._userInfoNotEmpty(inviteeNum)) {
      console.log("invitee " + inviteeNum + " is not filled properly!");
      return of(false);
    }

     // Case 3: if both fields are filled, check for validation using GetUserInfoService. if undefined is returned, return false
    let email: string = this.invitees[inviteeNum][0].value;
    // there will be a '+', so concatenate '0'
    let mobile: string = '0'.concat(this.invitees[inviteeNum][1].value.substring(1));
    return this.getUserInfoService.getUserID(email, mobile);
    // return new Promise((resolve, reject) => {
    //   if (
    //     this.invitees[inviteeNum][0].value !== '' &&
    //     this.invitees[inviteeNum][1].value !== ''
    //   ) {
    //     this.getUserInfoService
    //       .getUserID(
    //         this.invitees[inviteeNum][0].value,
    //         this.invitees[inviteeNum][1].value
    //       )
    //       .then((retrievedId) => {
    //         if (retrievedId !== undefined) {
    //           Valid = true;
    //         } else {
    //           Valid = false;
    //         }
    //         resolve(Valid);
    //       })
    //       .catch((error) => {
    //         console.error('An error occurred:', error);
    //         reject(error);
    //       });
    //   } else {
    //     resolve(Valid);
    //   }
    // });
  }

  onKeyStrokeDetected() {
      this.verified = false;
      this.inviteeVerified = [undefined, undefined, undefined];
  }

  private _userInfoNotEmpty(idx: number): boolean {
    return this.invitees[idx][0].value !== '' &&
    this.invitees[idx][1].value !== '';
  }

  private _userInfoIsEmpty(idx: number) : boolean {
    return this.invitees[idx][0].value === '' &&
    this.invitees[idx][1].value === '';
  }
}
