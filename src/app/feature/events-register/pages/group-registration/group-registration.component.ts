import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { Observable, ReplaySubject, of } from 'rxjs';
import { User } from 'src/app/models/user';
import {  RegGroupDTOResp } from 'src/app/models/dto/reg-group-dto';
import { MAX_USERS_IN_GROUP } from '../../constants/event-register-constants';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.scss'],
})
export class GroupRegistrationComponent extends BaseComponent implements OnInit {
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
    protected override spinner: NgxSpinnerService,
    private storeEventInfoService: StoreEventInfoService,
    private authService: AuthenticationService,
    private router: Router,
    private getRegInfoService: GetRegistrationGroupService,
    private storeRegGroupService: StoreRegistrationGroupInfoService,
    private getUserInfoService: GetUserInfoService
  ) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    this.spinnerShow();
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
    this.spinnerHide();
  }

  confirm(): void {
    // Save to DB
    this.spinnerShow();
    const emailList: string[] = [];
    const mobileList: string[] = [];
    for(let invitee of this.invitees){ //invitee is of type formcontrol
      if (invitee[0].value === '' || invitee[1].value === '') continue;

      emailList.push(invitee[0].value);
      mobileList.push('0'.concat(invitee[1].value.substring(1))); // Parse the mobile number into a more compatible form.
    }
    // Load the user's ID
    const user: User = this.authService.user!; // definitely won't be null, because of the authguard.
    emailList.push(user.email);
    mobileList.push(user.mobileNo);

    console.log(emailList, mobileList);
    const eventID : string = this.storeEventInfoService.eventInfo.eventID!; // won't be null, because of the auth guard.
    if (!this.modifyGroup){
      // Submits the group object.
      // Will route to the view-events page upon completion
      this._handleCreateGroupSubmission(emailList, mobileList, user.email, eventID);
    } else {
      // Submits the group object for modification
      // Will route to the view-events page upon completion
      this._handleModifyGroupSubmission(emailList, mobileList, user.email, user.userID, eventID);
    }
  }

  backToConcert(): void {
    this.router.navigate(['/events']);
  }

  onTextChange(): void {
    this.verified = false;
  }

  verify(): void {
    this.spinnerShow();
    setTimeout(() => {
      try {
        for (let inviteeIdx = 0; inviteeIdx < MAX_USERS_IN_GROUP; ++inviteeIdx){
          this.inputIsValid(inviteeIdx).subscribe(
            (data: boolean | undefined) => {
              this.inviteeVerified[inviteeIdx] = data;
            },
            (error: Error) => {
              this.inviteeVerified[inviteeIdx] = false;
              console.log(error);
            }
          );
        }
        this.spinnerHide();
      } catch (error) {
        console.error('An error occurred in verify():', error);
      }
    }, 5000);
  }

  isGroupVerified(): boolean {
    for (let status of this.inviteeVerified){
      if (status !== true) return false;
    }
    return true;
  }

  inputIsValid(inviteeNum: number): Observable<boolean | undefined> {
    // Case 1: if both fields are empty, there can be no invitation. return true
    if (this._userInfoIsEmpty(inviteeNum)) {
      return of(true);
    }

    // Case 2: if one field is empty, input is incomplete. return false
    if (!this._userInfoNotEmpty(inviteeNum)) {
      return of(false);
    }

     // Case 3: if both fields are filled, check for validation using GetUserInfoService. if undefined is returned, return false
    let email: string = this.invitees[inviteeNum][0].value;
    // there will be a '+', so concatenate '0'
    let mobile: string = '0'.concat(this.invitees[inviteeNum][1].value.substring(1));
    return this.getUserInfoService.getUserID(email, mobile);
  }

  onKeyStrokeDetected() {
      this.verified = false;
      this.inviteeVerified = [undefined, undefined, undefined];
  }


  // ===================================================
  // Handle group submission
  // ===================================================
  private _handleCreateGroupSubmission(emailList: string[], mobileList: string[], userEmail: string, eventID: string): void {
    this.storeRegGroupService.saveGroup(emailList, mobileList, userEmail, eventID).subscribe(
      (data: any) => {
        this.router.navigate(['/events']);
      },
      (error: Error) => {
        console.log(error);
        this.router.navigate(['/events']);
      }
    );
  }

  private _handleModifyGroupSubmission(emailList: string[], mobileList: string[], userEmail: string, userId: string, eventID: string): void {
    this.storeRegGroupService.saveModifiedGroup(emailList, mobileList, userEmail, userId, eventID).subscribe(
      (data: any) => {
        this.router.navigate(['/events']);
      },
      (error: Error) => {
        console.log(error);
        this.router.navigate(['/events']);
      }
    );
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
