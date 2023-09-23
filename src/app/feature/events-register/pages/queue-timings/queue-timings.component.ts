import { QueueTimingPopupComponent } from 'src/app/feature/events-register/components/registration-confirmation-popup/queue-timing-popup';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import {
  GetShowInfoService,
  ShowInfo,
} from './../../../../shared/services/get-show-info/get-show-info.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreQueueTimingService } from 'src/app/shared/services/store-queue-timing/store-queue-timing.service';

@Component({
  selector: 'app-queue-timings',
  templateUrl: './queue-timings.component.html',
  styleUrls: ['./queue-timings.component.scss'],
})
export class QueueTimingsComponent implements OnInit, AfterContentInit {
  eventID!: string | undefined;
  eventTitle: string | undefined;
  showInfo: ShowInfo[] | undefined;
  queueTimingForm: FormGroup;
  queueTimings: string[];
  queueIDs: string[];
  shows: string[];
  queueOptions: number[] = [];

  constructor(
    private getShowInfoService: GetShowInfoService,
    private storeEventInfoService: StoreEventInfoService,
    private storeQueueTimingService: StoreQueueTimingService,
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
      this.queueIDs = new Array(this.showInfo.length);
      this.shows = new Array(this.showInfo.length);
      for (
        let i = 0;
        i <
        Math.min(
          this.showInfo?.length!,
          this.storeEventInfoService.eventInfo.maxQueueable!
        );
        i++
      ) {
        const control = this.fb.control('', Validators.required);
        this.queueTimingForm.addControl(`queueTiming${i}`, control);
      }
      for (let show of this.showInfo) {
        const queueStartTime = this.formatQueueDate(show.queueStartTime);
        const showTime = this.formatShowDate(show.showDateTime);
        this.queueTimings[count] = queueStartTime + ' | SHOW TIME: ' + showTime;
        this.queueIDs[count] = show.queueID;
        count++;
      }
    }

    // Load number of queue options
    this._loadQueueOptions();
  }

  ngAfterContentInit(): void {
    this.handleInformationClick();
  }

  handleBackToConcert(): void {
    this.router.navigate(['/events']);
  }

  handleInformationClick(): void {
    this.activeModal.open(QueueTimingPopupComponent, { centered: true });
  }

  handleNext(): void {
    if (this.showInfo) {
      var selectedQueueTimings: string[] = new Array(
        Math.min(
          this.showInfo?.length!,
          this.storeEventInfoService.eventInfo.maxQueueable!
        )
      );
      var selectedQueueIDs: string[] = new Array(selectedQueueTimings.length);
      for (let i = 0; i < this.showInfo?.length; i++) {
        const controlName = `queueTiming${i}`;
        const controlValue = this.queueTimingForm.get(controlName)?.value;
        if (controlValue) selectedQueueTimings[i] = controlValue;
      }
      // if user did not select any first choice queue timing, do not let them move forward
      if(selectedQueueTimings[0] == null) return;
      for (let i = 0; i < selectedQueueTimings.length; i++) {
        selectedQueueIDs[i] =
          this.queueIDs[this.queueTimings.indexOf(selectedQueueTimings[i])];
      }
      this.storeQueueTimingService.queueTimingPreferences = {
        eventID: this.eventID,
        userID: this.storeEventInfoService.eventInfo.userID,
        selectedQueueIDs: selectedQueueIDs,
        selectedQueueTimings: selectedQueueTimings,
        groupID: this.storeEventInfoService.eventInfo.eventID,
      };
      this.router.navigate(['/events', 'register', 'preview']);
    }
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
    for (
      let i: number = 0;
      i <
      Math.min(
        this.showInfo?.length!,
        this.storeEventInfoService.eventInfo.maxQueueable!
      );
      i++
    ) {
      this.queueOptions.push(i);
    }
  }
}
