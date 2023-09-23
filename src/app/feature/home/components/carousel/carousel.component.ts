import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { Event } from '../../../../models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Output() hasError = new EventEmitter<void>();
  events: Event[] = [];

  constructor(
    private getEventInfoService: GetEventInfoService,
    private router: Router,
    private storeEventInfoService: StoreEventInfoService,
    private authService: AuthenticationService,
    private activeModal: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    const eventsIterator = this.getEventInfoService.loadAllCarousellEvents().values();

    for (let event of eventsIterator) {
      this.events.push(event);
    }

    console.log("Carousell = " + this.events);
  }

  handleRegisterButtonClick(eventID: string): void {
    if (!this.authService.isVerified) {
      this.activeModal.open(LoginPopupComponent, { centered: true });
      this.hasError.emit();
      return;
    }
    const eventSelected = this.getEventInfoService.getEventInfo(eventID);
    if (eventSelected == undefined) return;
    this.storeEventInfoService.eventInfo = {
      eventID: eventID,
      eventTitle: eventSelected.name,
      maxQueueable: eventSelected.maxQueueable,
    };
    this.router.navigate(['/events', 'register', 'group']);
  }

  handleLearnMoreButtonClick(eventID: string): void {
    // var currentEvent: Event;
    // for (let event of this.events) {
    //   if (event.eventID == eventID) {
    //     currentEvent = event;
    //     this.storeEventInfoService.eventInfo = {
    //       eventID: eventID,
    //       eventTitle: currentEvent.name,
    //       maxQueueable: currentEvent.maxQueueable,
    //     };
    //   }
  }

  //   this.router.navigate(['/events']);
  // }
}
