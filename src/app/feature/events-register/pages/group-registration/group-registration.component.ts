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
import { ReplaySubject } from 'rxjs';

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

    // In case user has a group, but wants to change group.
    if (this.storeRegGroupService.modifyGroup) {
      this.storeRegGroupService.modifyGroup = false; // reset the flag
      // load all fields into the original positions
      for (let i = 0; i < this.storeRegGroupService.emailList.length; ++i) {
        this.invitees[i][0].setValue(this.storeRegGroupService.emailList[i]);
        this.invitees[i][1].setValue(this.storeRegGroupService.mobileList[i]);
      }
    }
  }

  confirm(): void {
    // Save to DB
    // Route back to login
    this.router.navigate(['/events']);
  }

  backToConcert(): void {
    this.router.navigate(['/events']);
  }

  onTextChange(): void {
    console.log("text changed");
    this.verified = false;
  }

  async verify(): Promise<void> {
    try {
      const result0 = await this.inputIsValid(0);
      const result1 = await this.inputIsValid(1);
      const result2 = await this.inputIsValid(2);

      this.verified = (result0 && result1 && result2);
      // Use the boolean values in the verify function
      console.log('Result for inviteeNum 0:', result0);
      console.log('Result for inviteeNum 1:', result1);
      console.log('Result for inviteeNum 2:', result2);
    } catch (error) {
      console.error('An error occurred in verify():', error);
    }
  }

  async inputIsValid(inviteeNum: number): Promise<boolean> {
    let Valid = false;

    // Case 1: if both fields are empty, there can be no invitation. return true
    if (
      this.invitees[inviteeNum][0].value === '' &&
      this.invitees[inviteeNum][1].value === ''
    ) {
      return true;
    }

    // Case 2: if one field is empty, input is incomplete. return false
    if (
      (this.invitees[inviteeNum][0].value !== '' &&
        this.invitees[inviteeNum][1].value === '') ||
      (this.invitees[inviteeNum][0].value === '' &&
        this.invitees[inviteeNum][1].value !== '')
    ) {
      return false;
    }

     // Case 3: if both fields are filled, check for validation using GetUserInfoService. if undefined is returned, return false
    return new Promise((resolve, reject) => {
      if (
        this.invitees[inviteeNum][0].value !== '' &&
        this.invitees[inviteeNum][1].value !== ''
      ) {
        console.log('Starting promise resolution...');
        this.getUserInfoService
          .getUserID(
            this.invitees[inviteeNum][0].value,
            this.invitees[inviteeNum][1].value
          )
          .then((retrievedId) => {
            console.log('Promise resolved with:', retrievedId);
            if (retrievedId !== undefined) {
              console.log(`User ID: ${retrievedId}`);
              Valid = true;
            } else {
              console.log('User not found.');
              Valid = false;
            }
            resolve(Valid);
          })
          .catch((error) => {
            console.error('An error occurred:', error);
            reject(error);
          });
        console.log('Promise request sent...');
      } else {
        resolve(Valid);
      }
    });
  }

  onKeyStrokeDetected() {
    if (this.verified === true) {
      this.verified = false;
    }
  }
}
