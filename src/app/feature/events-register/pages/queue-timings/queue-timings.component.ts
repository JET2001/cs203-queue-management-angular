import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import {
  AfterContentInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QueueTimingPopupComponent } from 'src/app/feature/events-register/components/registration-confirmation-popup/queue-timing-popup';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreQueueTimingService } from 'src/app/shared/services/store-queue-timing/store-queue-timing.service';
import {
  GetShowInfoService,
  ShowInfo,
} from './../../../../shared/services/get-show-info/get-show-info.service';
import { QueueDTOResp } from 'src/app/models/dto/queues-dto';
import { GetQueueInfoService } from 'src/app/shared/services/get-queue-info/get-queue-info.service';
import { GetRegistrationGroupService } from 'src/app/shared/services/get-registration-group/get-registration-group.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-queue-timings',
  templateUrl: './queue-timings.component.html',
  styleUrls: ['./queue-timings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QueueTimingsComponent extends BaseComponent implements OnInit, AfterContentInit {
  eventID!: string | undefined;
  userID !: string | undefined;
  eventTitle: string | undefined;
  showInfo: ShowInfo[] | undefined;
  queueTimingForm: FormGroup;
  queueTimings: string[];
  queueIDs: string[];
  shows: string[];
  queueOptions: number[] = [];
  isNextDisabled = true;
  maxQueueable!: number;
  userRegGroupId!: string;

  selection2queueShowMap!: Map<string, QueueDTOResp>;
  hasQueuesLoaded: boolean = false;

  constructor(
    protected override spinner: NgxSpinnerService,
    private storeEventInfoService: StoreEventInfoService,
    private storeQueueTimingService: StoreQueueTimingService,
    private getQueueInfoService: GetQueueInfoService,
    private router: Router,
    private fb: FormBuilder,
    private activeModal: NgbModal,
    private getRegGroupService: GetRegistrationGroupService,
    private authService: AuthenticationService
  ) {
    super(spinner);
    this.queueTimingForm = this.fb.group({});
  }

  ngOnInit(): void {
    // EventID and users have been verified at this point.
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.eventTitle = this.storeEventInfoService.eventInfo.eventTitle;
    this.maxQueueable = this.storeEventInfoService.eventInfo.maxQueueable!;
    this.userID = this.authService.userID;
    this.queueTimings = [];
    this.selection2queueShowMap = new Map<string, QueueDTOResp>();

    this.getRegGroupService.getRegGroupOfUser(this.eventID!, this.userID).subscribe(
      (data: any) => {
        this.userRegGroupId = data.groupId;
      },
      (error: Error) => {
        console.error(error);
        this.router.navigate(['/events']);
      }
    );

    // Get all queuetimes, showtimes for the eventID
    this.getQueueInfoService.getQueuesForEvent(this.eventID!).subscribe(
      (data: any) => {
        for (let queueObj of data) {
          const queue: QueueDTOResp = {
            queueId: queueObj.queueId,
            queueStartTime: queueObj.startDateTime,
            queueEndTime: queueObj.endDateTime,
            showId: queueObj.showId,
            eventId: queueObj.eventId,
            showDateTime: queueObj.showDateTime,
            locationName: queueObj.locationName,
          };
          this._processQueue(queue);
        }
        // Load number of queue options
        this._loadQueueOptions();

        for (let i = 0; i < Math.min(this.maxQueueable, this.selection2queueShowMap.size); i++) {
          const control = this.fb.control('', Validators.required);
          this.queueTimingForm.addControl(`queueTiming${i}`, control);
        }

        this.hasQueuesLoaded = true;
        this.spinnerHide();
      },
      (error: Error) => {
        console.error(error);
        this.spinnerHide();
      }
    );
  }

  ngAfterContentInit(): void {
    this.handleInformationClick();
  }

  handleBackToConcert(): void {
    this.spinnerShow();
    this.router.navigate(['/events']);
  }

  handleInformationClick(): void {
    this.activeModal.open(QueueTimingPopupComponent, { centered: true });
  }

  handleNextButtonClick(): void {
    let selectedQueueTimings: string[] = [];
    let selectedQueueShows: QueueDTOResp[] = [];

    for (let i = 0; i < this.queueTimings.length; i++) {
      const controlName = `queueTiming${i}`;
      const controlValue = this.queueTimingForm.get(controlName)?.value;
      if (controlValue) {
        // Save it in the list of selection strings
        selectedQueueTimings.push(controlValue);

        // Save it in the selected shows object.
        let queueShowRef : QueueDTOResp | undefined = this.selection2queueShowMap.get(controlValue);
        if (queueShowRef != undefined){
          selectedQueueShows.push(queueShowRef);
        }
      }
    }
    // As long as users selected 1 queue, we can allow them to proceed
    if (selectedQueueTimings.length !== 0 && selectedQueueTimings.length === selectedQueueShows.length){
      this.storeQueueTimingService.setQueueTimingPreferences(
        this.userRegGroupId, this.userID!, this.eventID!, selectedQueueShows
      );
      this.storeQueueTimingService.selectionStrings = selectedQueueTimings;
      this.router.navigate(['/events','register','preview']);
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

  private _processQueue(queue: QueueDTOResp): void {
    let selectionStr =
      'QUEUE TIME: ' +
      queue.queueStartTime +
      '| SHOW TIME: ' +
      queue.locationName +
      ' ' +
      queue.showDateTime;

    // Add it to queueTimings screen (for FE display)
    this.queueTimings.push(selectionStr);

    // Add to map
    this.selection2queueShowMap.set(selectionStr, queue);
  }

  private _loadQueueOptions(): void {
    for (
      let i: number = 0;
      i <
      Math.min(
        this.maxQueueable,
        this.queueTimings.length
      );
      i++
    ) {
      this.queueOptions.push(i);
    }
  }

  onOptionSelected(): void {
    for (let i = 0; i < this.queueOptions.length; i++) {
      const controlName = `queueTiming${i}`;
      const controlValue = this.queueTimingForm.get(controlName)?.value;
      if (!controlValue) {
        this.isNextDisabled = true;
        return;
      }
    }
    this.isNextDisabled = false;
  }
}
