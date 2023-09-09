import { GetEventInfoService } from '../../../../shared/services/get-event-info-service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../models/event';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

export class CarouselComponent implements OnInit{
  events: Event[];
  constructor(
    private getEventInfoService: GetEventInfoService,
    private router: Router,
    private storeEventInfoService: StoreEventInfoService
  ) {}

  mockUserID : number = 1;
  ngOnInit(): void {
    this.getEventInfoService.loadAllCarousellEvents().then((events) => {
      this.events = events;
    })
  }

  handleRegisterButtonClick(eventID: number): void {
    // to be implemented once we have other pages to route to
    // this.router.navigate()
    // window.location.href = link;
    this.storeEventInfoService.eventInfo = {
      userID: this.mockUserID,
      eventID: eventID
    };
    this.router.navigate(['/events','register','group']);
  }

  handleLearnMoreButtonClick(eventID: number): void {
    this.storeEventInfoService.eventInfo = {
      userID: this.mockUserID,
      eventID: eventID
    };
    this.router.navigate(['/events']);
  }
}
