import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info/store-event-info.service';
import { StoreQueueTimingService } from 'src/app/shared/services/store-queue-timing/store-queue-timing.service';
import { QueueTimingPopupComponent } from '../../components/registration-confirmation-popup/queue-timing-popup';
import { GaRegistrationPopupComponent } from '../../components/ga-registration-popup/ga-registration-popup.component';

@Component({
  selector: 'app-registration-preview',
  templateUrl: './registration-preview.component.html',
  styleUrls: ['./registration-preview.component.scss'],
})
export class RegistrationPreviewComponent implements OnInit {
  eventID: string | undefined;
  eventTitle: string | undefined;
  queueTimings: string[] | undefined;
  constructor(
    private storeQueueTimingService: StoreQueueTimingService,
    private storeEventInfoService: StoreEventInfoService,
    private router: Router,
    private activeModal: NgbModal
  ) {}

  async ngOnInit() {
    this.eventID = this.storeEventInfoService.eventInfo.eventID;
    this.eventTitle = this.storeEventInfoService.eventInfo.eventTitle;

    this.queueTimings = this.storeQueueTimingService.selectionStrings;
  }

  handleBackToQueueSelection(): void {
    this.router.navigate(['/events', 'register', 'queue']);
  }

  handleInformationClick(): void {
    this.activeModal.open(QueueTimingPopupComponent, { centered: true });
  }

  handleConfirmButtonClick(): void {
    this.storeQueueTimingService.confirmQueueTimingsForGroup().subscribe(
      (data: any) => {
        if (data === true){
          // Purchase successful
          this.router.navigate(['/events']);
        }
        else{
          console.error("Method returned false. Internal server error");
        }
      },
      (error: Error) => {
        console.error(error);
        this.router.navigate(['/events','register']); // reselect queue options
      }
    )
  }
}
