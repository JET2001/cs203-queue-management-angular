import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { Event } from '../../../../models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessagesService } from 'src/app/core/services/error-messages/error-messages.service';
import { MessageService } from 'primeng/api';
import { NO_CONNECTION_MESSAGE } from 'src/app/core/constants/error-messages';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent extends BaseComponent implements OnInit {
  @Output() hasError = new EventEmitter<void>();
  events: Event[] = [];
  isCarousellReady: boolean = false;
  id2CarousellEvent: Map<string, Event>;


  constructor(
    protected override spinner: NgxSpinnerService,
    private getEventInfoService: GetEventInfoService,
    private router: Router,
    private storeEventInfoService: StoreEventInfoService,
    private authService: AuthenticationService,
    private getRegGroupService: GetRegistrationGroupService,
    private activeModal: NgbModal,
    private errorMessageService: ErrorMessagesService,
    private messageService: MessageService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.id2CarousellEvent = new Map<string, Event>();

    this.getEventInfoService.loadAllCarousellEvents().subscribe((data: any) => {
      // Get highlighted events from data
      for (let obj of data) {
        let event: Event = {
          eventID: obj.id,
          name: obj.name,
          countries: obj.countries,
          maxQueueable: obj.maxQueueable,
          description: obj.description,
          image: obj.posterImagePath,
          isHighlighted: obj.highlighted,
        };

        this._buildEventSummary(event);

        this.events.push(event);
        this.id2CarousellEvent.set(event.eventID, event);
      }
      this.isCarousellReady = true;
    },
    (error: HttpErrorResponse) => {
      let message: string = "";
      if (error.status == 0) message = NO_CONNECTION_MESSAGE;
      else message = error.message;

      this.messageService.add({
        severity: 'error',
        summary: message
      });
    }
    );

    // Errors from another page
    if (this.errorMessageService.hasError){
      this.messageService.add({
        severity: 'error',
        summary: this.errorMessageService.message
      });
    }

  }

  handleRegisterButtonClick(eventID: string): void {
    if (!this.authService.isVerified) {
      this.activeModal.open(LoginPopupComponent, { centered: true });
      this.hasError.emit();
      return;
    }
    this.spinnerShow();
    // Get information for the event
    const eventSelected : Event | undefined = this.id2CarousellEvent.get(eventID);
    if (eventSelected === undefined) {
      this.spinnerHide();
      return;
    }
    this.storeEventInfoService.eventInfo = {
        eventID: eventID,
        eventTitle: eventSelected.name,
        maxQueueable: eventSelected.maxQueueable,
    }

    // Check if user has registered for an event
    this.getRegGroupService.getRegGroupOfUser(eventID, this.authService.userID).subscribe(
      (data: any) => {
        // User has already registered --> route user to events page.
        this.errorMessageService.message = "You have already registered for this event";
        this.router.navigate(['/events']);
      },
      (error: HttpErrorResponse) => {
        // User has not registered. Now we can route to group-register.
        this.router.navigate(['/events','register', 'group']);
      }
    );
  }

  handleLearnMoreButtonClick(eventID: string): void {
    this.spinnerShow();
    const eventSelected : Event | undefined = this.id2CarousellEvent.get(eventID);

    if(eventSelected !== undefined){
      this.storeEventInfoService.eventInfo = {
        eventID: eventSelected.eventID,
        eventTitle: eventSelected.name,
        maxQueueable: eventSelected.maxQueueable,
      };
      this.router.navigate(['/events']);
    }
    this.spinnerHide();
  }

  private _buildEventSummary(event: Event): void {
    let summaryStringBuilder = 'Coming to ';

    // Build event summary
    for (let i = 0; i < event.countries.length - 1; ++i) {
      summaryStringBuilder = summaryStringBuilder + event.countries[i] + ', ';
    }

    summaryStringBuilder +=
      'and ' + event.countries[event.countries.length - 1];
    event.summary = summaryStringBuilder + '!';
  }

}
