import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GetShowInfoService,
  ShowInfo,
} from 'src/app/shared/services/get-show-info/get-show-info.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-shows',
  templateUrl: './view-shows.component.html',
  styleUrls: ['./view-shows.component.scss'],
})
export class ViewShowsComponent implements OnInit {
  eventID: number | undefined;
  showInfo: any[];
  loading: boolean = true;
  @ViewChild('dt') dt: Table | undefined;
  columns: any[] = [
    { field: 'eventDateAndTime', header: 'Event Date & Time' },
    { field: 'venue', header: 'Venue' },
    { field: 'queueStartTime', header: 'Queue Start Time' },
  ];

  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private getShowInfoService: GetShowInfoService
  ) {}

  async ngOnInit() {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;

    await this.getShowInfoService
      .loadShowInfo(this.eventID)
      .then((showInfo: ShowInfo[] | undefined) => {
        this.showInfo = new Array(showInfo?.length);
        if (showInfo) {
          showInfo.forEach((info: ShowInfo) => {
            this.showInfo.push({
              eventDateAndTime: info.showDateTime,
              venue: info.locationName,
              queueStartTime: info.queueStartTime,
            });
          });
        }
      });
  }
}
