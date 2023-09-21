import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { RegGroup } from 'src/app/models/reg-group';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreRegistrationGroupInfoService } from 'src/app/shared/services/store-registration-group-info/store-registration-group-info.service';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.scss'],
})
export class GroupRegistrationComponent implements OnInit {
  // Fields
  eventID!: number | undefined;
  groupID!: number | undefined;
  eventTitle!: string | undefined;

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
    private storeRegGroupService: StoreRegistrationGroupInfoService
  ) {}

  async ngOnInit(): Promise<void> {
    // Case 1: User not verified
    if (!this.authService.isVerified) {
      this.router.navigate(['/home']); // TODO: Return to home with an appropriate error message
      return;
    }

    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.eventTitle = this.storeEventInfoService.eventInfo.eventTitle;
    // Case 2: EventIDs are not properly loaded.
    if (this.eventID == undefined || this.eventTitle == undefined) {
      this.router.navigate(['/home']); // TODO: Return to home screen with an appropriate error msg
      return;
    }

    // Case 3: User already has a group, so the register button should not bring this user to queue.
    await this.getRegInfoService
      .getRegGroupOfUser(this.eventID, this.authService.userID)
      .then((group: RegGroup | undefined) => {
        if (group != undefined) {
          // User already has a group --> navigate user to /events
          this.router.navigate(['/events']); // TODO: Show an appropriate error message
        }
      });

    // Case 4: User already has a group, but wants to change group.
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
}
