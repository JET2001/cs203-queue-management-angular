import { Component } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-register-invite',
  templateUrl: './group-register-invite.component.html',
  styleUrls: ['./group-register-invite.component.scss'],
})
export class GroupRegisterInviteComponent {
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

  invitee1UserID : number | undefined;
  invitee2UserID : number | undefined;
  invitee3UserID : number | undefined;

  constructor(){

  }

}
