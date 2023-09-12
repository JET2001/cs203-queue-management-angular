import { Event } from 'src/app/models/event';
import { GetEventInfoService } from '../../../../shared/services/get-event-info/get-event-info-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-concerts',
  templateUrl: './upcoming-concerts.component.html',
  styleUrls: ['./upcoming-concerts.component.scss'],
})
export class UpcomingConcertsComponent implements OnInit{
  events: Event[];
  constructor(private getEventInfoService: GetEventInfoService, private router: Router) {}

  ngOnInit(): void {
      this.getEventInfoService.loadAllCarousellEvents().then((events) => {
        this.events = events;
      })
  }

  handleButtonClick(eventID: number): void {
    this.router.navigate(['/events']);
  }
}
