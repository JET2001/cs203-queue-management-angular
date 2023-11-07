import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Event } from 'src/app/models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessagesService } from 'src/app/core/services/error-messages/error-messages.service';
import { MessageService } from 'primeng/api';
import { NO_CONNECTION_MESSAGE } from 'src/app/core/constants/error-messages';

@Component({
  selector: 'app-upcoming-concerts',
  templateUrl: './upcoming-concerts.component.html',
  styleUrls: ['./upcoming-concerts.component.scss'],
})
export class UpcomingConcertsComponent extends BaseComponent implements OnInit {
  @Input() userID: string | undefined = undefined;
  events: Event[];
  id2EventMap: Map<string, Event>;
  hasConcertsLoaded: boolean = false;

  constructor(
    protected override spinner: NgxSpinnerService,
    private getEventInfoService: GetEventInfoService,
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private errorMessageService: ErrorMessagesService,
    private messageService: MessageService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.id2EventMap = new Map<string, Event>();

    this.getEventInfoService.loadAllEvents().subscribe(
      (data: any) => {
        // clean the data
        this.events = new Array();
        for (let eventData of data) {
          let event: Event = {
            eventID: eventData.id,
            name: eventData.name,
            countries: [],
            maxQueueable: eventData.maxQueueable,
            description: eventData.description,
            image: eventData.posterImagePath,
            isHighlighted: eventData.highlighted,
          };
          this.events.push(event);
          this.id2EventMap.set(event.eventID, event);
        }
        this.hasConcertsLoaded = true;
      },
      (error: HttpErrorResponse) => {
        let message: string = "";
        if (error.status == 0)message = NO_CONNECTION_MESSAGE;
        else message = error.message;

        this.messageService.add({
          severity: 'error',
          summary: message
        });
      }
    );
  }

  handleButtonClick(eventID: string): void {
    const eventSelected: Event | undefined = this.id2EventMap.get(eventID);
    if (eventSelected === undefined) return;
    this.spinnerShow();
    this.storeEventInfoService.eventInfo = {
      eventID: eventID,
      eventTitle: eventSelected.name,
      maxQueueable: eventSelected.maxQueueable,
    };
    this.router.navigate(['/events']);
  }
}
