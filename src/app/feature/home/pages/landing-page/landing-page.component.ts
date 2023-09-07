import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router
  ){}

  // Temporary methods to demonstrate routing
  handleEventID1Click(): void {
    this.storeEventInfoService.eventInfo = {
      eventID: 1
    };
    this.router.navigate(['/events']);
  }

  handleEventID2andUserID3Click(): void {
    this.storeEventInfoService.eventInfo = {
      eventID: 2,
      userID: 3
    };
    this.router.navigate(['/events']);
  }
}
