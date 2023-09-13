import { GaVerificationPopupComponent } from 'src/app/shared/components/ga-verification-popup/ga-verification-popup.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { QueueTimingPopupComponent } from 'src/app/feature/events-register/components/registration-confirmation-popup/queue-timing-popup';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  userID !: number | undefined;
  constructor(
    private authService: AuthenticationService,
    private activeModal: NgbModal
  ){}

  ngOnInit(): void {
    this.userID = this.authService.userID;
  }

  authenticateUser(): void {
    this.activeModal.open(GaVerificationPopupComponent, {centered: true});
  }

  testQueueTimingPopup(): void {
    this.activeModal.open(QueueTimingPopupComponent, {centered: true});
  }

}
