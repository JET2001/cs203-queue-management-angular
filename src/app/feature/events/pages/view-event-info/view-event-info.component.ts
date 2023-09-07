import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';

@Component({
  selector: 'app-view-event-info',
  templateUrl: './view-event-info.component.html',
  styleUrls: ['./view-event-info.component.scss']
})
export class ViewEventInfoComponent implements OnInit {
  eventID!: number | undefined;
  userID !: number | undefined;
  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.userID = this.storeEventInfoService.eventInfo.userID;
    if (this.eventID == undefined){
      this.router.navigate(['/home']);
    }
  }

  registerForGroup(): void {
    this.router.navigate(['/events', 'register','group']);
  }


}
