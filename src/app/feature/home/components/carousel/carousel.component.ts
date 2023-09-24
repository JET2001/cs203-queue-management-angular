import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
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
  isCarousellReady : boolean = false;
  id2CarousellEvent: Map<string, Event> = new Map<string, Event>();

  constructor(
    private getEventInfoService: GetEventInfoService,
    private router: Router,
    private storeEventInfoService: StoreEventInfoService,
    private authService: AuthenticationService,
    private activeModal: NgbModal
  ) {}

  ngOnInit(): void {
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
    this.storeEventInfoService.eventInfo = {
      eventID: eventID
    };

    this.router.navigate(['/events']);
  }


  private _loadCarousellEvents(data: any): void {
    this.getEventInfoService.loadAllCarousellEvents().subscribe((data: any) => {
      // Get highlighted events from data
      for (let obj of data) {
        let event: Event = {
          eventID: obj.id,
          name: obj.name,
          countries: [],
          maxQueueable: obj.maxQueueable,
          description: obj.description,
          image: obj.posterImagePath,
          isHighlighted: obj.highlighted,
        };

        if (event.isHighlighted) {
          this.events.push(event);
        }


        this.isCarousellReady = true;
      }
    });
  }
}
