import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  userID !: number | undefined;
  constructor(
    private storeEventInfoService: StoreEventInfoService,
  ){}

  ngOnInit(): void {
    this.userID = this.storeEventInfoService.eventInfo.userID;
  }



}
