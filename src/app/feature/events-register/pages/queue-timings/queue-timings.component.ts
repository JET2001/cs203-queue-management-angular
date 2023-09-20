import { QueueTimingPopupComponent } from 'src/app/feature/events-register/components/registration-confirmation-popup/queue-timing-popup';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import {
  GetShowInfoService,
  ShowInfo,
} from './../../../../shared/services/get-show-info/get-show-info.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-queue-timings',
  templateUrl: './queue-timings.component.html',
  styleUrls: ['./queue-timings.component.scss'],
})
export class QueueTimingsComponent implements OnInit {
  eventID!: number | undefined;
  eventTitle: string | undefined;
  showInfo: ShowInfo[] | undefined;
  queueTimingForm: FormGroup;
  queueTimings: String[];
  shows: String[];
  queueOptions: number[] = [];

  constructor(
    private getShowInfoService: GetShowInfoService,
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private fb: FormBuilder,
    private activeModal: NgbModal
  ) {
    this.queueTimingForm = this.fb.group({});
  }

  async ngOnInit() {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.eventTitle = this.storeEventInfoService.eventInfo.eventTitle;

    if (this.eventID == undefined) {
      this.router.navigate(['/home']);
      return;
    }

    await this.getShowInfoService
      .loadShowInfo(this.eventID)
      .then((showInfo: ShowInfo[] | undefined) => {
        this.showInfo = showInfo;
      });

    if (this.showInfo) {
      let count: number = 0;
      this.queueTimings = new Array(this.showInfo.length);
      this.shows = new Array(this.showInfo.length);
      for (let show of this.showInfo) {
        const queueStartTime = this.formatQueueDate(show.queueStartTime);
        const showTime = this.formatShowDate(show.showDateTime);
        this.queueTimings[count] = queueStartTime + ' | SHOW TIME: ' + showTime;
        const control = this.fb.control('', Validators.required);
        this.queueTimingForm.addControl(`queueTiming${count}`, control);
        count++;
      }
    }

    // Load number of queue options
    this._loadQueueOptions();
  }

  handleBackToConcert(): void {
    this.router.navigate(['/events']);
  }

  handleInformationClick(): void {
    this.activeModal.open(QueueTimingPopupComponent, { centered: true });
  }

  formatQueueDate(date: Date): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${day} ${month} ${year}, ${hours}:${minutes} SGT`;
  }

  formatShowDate(date: Date): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${day} ${month} ${year}, Singapore 397718, ${hours}:${minutes} SGT`;
  }

  private _loadQueueOptions(): void {
    for (let i: number = 1; i <= Math.min(this.showInfo?.length!, this.storeEventInfoService.eventInfo.maxQueueable!); ++i){
      this.queueOptions.push(i);
    }
  }
}
