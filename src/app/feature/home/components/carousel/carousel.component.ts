import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { Event } from '../../../../models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Output() hasError = new EventEmitter<void>();
  events: Event[] = [];
  isCarousellReady: boolean = false;
  id2CarousellEvent: Map<string, Event>;

  constructor(
    private getEventInfoService: GetEventInfoService,
    private router: Router,
    private storeEventInfoService: StoreEventInfoService,
    private authService: AuthenticationService,
    private getRegGroupService: GetRegistrationGroupService,
    private activeModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.id2CarousellEvent = new Map<string, Event>();

    this.getEventInfoService.loadAllCarousellEvents().subscribe((data: any) => {
      this._loadCarousellEvents(data);
    });
  }

  handleRegisterButtonClick(eventID: string): void {
    if (!this.authService.isVerified) {
      this.activeModal.open(LoginPopupComponent, { centered: true });
      this.hasError.emit();
      return;
    }
    // Get information for the event
    const eventSelected : Event | undefined = this.id2CarousellEvent.get(eventID);
    if (eventSelected === undefined) return;

    this.storeEventInfoService.eventInfo = {
        eventID: eventID,
        eventTitle: eventSelected.name,
        maxQueueable: eventSelected.maxQueueable,
    }

    // Check if user has registered for an event
    this.getRegGroupService.getRegGroupOfUser(eventID, this.authService.userID).subscribe(
      (data: any) => {
        // User has already registered --> route user to events page.
        this.router.navigate(['/events']);
      },
      (error: Error) => {
        // User has not registered. Now we can route to group-register.
        this.router.navigate(['/events','register', 'group']);
      }
    );
  }

  handleLearnMoreButtonClick(eventID: string): void {
    // console.log(eventID);
    const eventSelected : Event | undefined = this.id2CarousellEvent.get(eventID);

    if(eventSelected !== undefined){
      this.storeEventInfoService.eventInfo = {
        eventID: eventSelected.eventID,
        eventTitle: eventSelected.name,
        maxQueueable: eventSelected.maxQueueable,
      };
      this.router.navigate(['/events']);
    }
  }

  private _loadCarousellEvents(data: any): void {
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
    });
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
