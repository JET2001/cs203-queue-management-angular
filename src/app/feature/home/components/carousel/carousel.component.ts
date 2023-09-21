import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { Event } from '../../../../models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  events: Event[];
  constructor(
    private getEventInfoService: GetEventInfoService,
    private router: Router,
    private storeEventInfoService: StoreEventInfoService,
    private authService: AuthenticationService,
    private activeModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getEventInfoService.loadAllCarousellEvents().then((events) => {
      this.events = events;
    });
  }

  handleRegisterButtonClick(eventID: number): void {
    if (!this.authService.isVerified) {
      this.activeModal.open(LoginPopupComponent, { centered: true });
      return;
    }
    this.storeEventInfoService.eventInfo = {
      eventID: eventID,
      eventTitle: this.events[eventID].name,
      maxQueueable: this.events[eventID].maxQueueable,
    };
    this.router.navigate(['/events', 'register', 'group']);
  }

  handleLearnMoreButtonClick(eventID: number): void {
    var currentEvent: Event;
    for (let event of this.events) {
      if (event.eventID == eventID) {
        currentEvent = event;
        this.storeEventInfoService.eventInfo = {
          eventID: eventID,
          eventTitle: currentEvent.name,
          maxQueueable: currentEvent.maxQueueable,
        };
      }
    }

    this.router.navigate(['/events']);
  }
}
