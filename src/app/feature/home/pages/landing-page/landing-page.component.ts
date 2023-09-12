import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GaVerificationPopupComponent } from 'src/app/shared/components/ga-verification-popup/ga-verification-popup.component';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  // Temporary methods to demonstrate routing
  handleEventID1Click(): void {
    this.storeEventInfoService.eventInfo = {
      eventID: 1,
    };
    this.router.navigate(['/events']);
  }

  handleEventID2andUserID3Click(): void {
    this.storeEventInfoService.eventInfo = {
      eventID: 2,
      userID: 3,
    };
    this.router.navigate(['/events']);
  }

  // Temporary method to demonstrate modal
  handlePopUpClick(): void {
    this.modalService.open(GaVerificationPopupComponent, { centered: true });
  }
}
