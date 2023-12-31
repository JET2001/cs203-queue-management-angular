import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GetShowInfoService,
  ShowInfo,
} from 'src/app/shared/services/get-show-info/get-show-info.service';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { Table } from 'primeng/table';
import { QueueTempStorageService } from 'src/app/mock-db/queue-temp-storage/queue-temp-storage.service';

@Component({
  selector: 'app-view-shows',
  templateUrl: './view-shows.component.html',
  styleUrls: ['./view-shows.component.scss'],
})
export class ViewShowsComponent implements OnInit {
  eventID: string | undefined;
  showInfo: any[] = [];
  loading: boolean = true;
  @ViewChild('dt') dt: Table | undefined;
  columns: any[] = [
    { field: 'eventDateAndTime', header: 'Event Date & Time' },
    { field: 'venue', header: 'Venue' },
    { field: 'queueStartTime', header: 'Queue Start Time' },
  ];

  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private getShowInfoService: GetShowInfoService,
    private queueTempStorageService: QueueTempStorageService
  ) // private datePipe: DatePipe
  {}

  ngOnInit(): void {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.getShowInfoService.loadShowInfo(this.eventID!).subscribe(
      (data: any) => {
        this.queueTempStorageService.loadQueuesForShows(data).then();
        for (let obj of data) {
          this.showInfo.push({
            queueID: obj.queueId,
            eventDateAndTime: obj.dateTime.toString(),
            venue: obj.locationName.toString(),
            queueStartTime: obj.queues[0].startDateTime.toString()
          });
        }
        this.loading = false;
      },
    );
  }
}
