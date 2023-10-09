import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { VerifyEmailPopupComponent } from 'src/app/feature/user-register/components/verify-email-popup/verify-email-popup.component';
import { User } from 'src/app/models/user';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [MessageService],
})
export class LandingPageComponent implements OnInit {
  userID!: string | undefined;
  constructor(
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.userID = this.authService.userID;
  }

  // openErrorMessage(): void {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'You can only register for an event when you are logged in'
  //   });
  // }
}
