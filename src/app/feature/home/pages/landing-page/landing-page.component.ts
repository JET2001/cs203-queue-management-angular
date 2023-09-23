import { GaVerificationPopupComponent } from 'src/app/shared/components/ga-verification-popup/ga-verification-popup.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [MessageService],
})
export class LandingPageComponent implements OnInit {
  userID!: number | undefined;
  constructor(
    private authService: AuthenticationService
  ) // private messageService: MessageService
  {}

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
