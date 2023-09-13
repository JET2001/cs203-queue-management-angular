import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-queue-timing-popup',
  templateUrl: './queue-timing-popup.component.html',
  styleUrls: ['./queue-timing-popup.component.scss']
})
export class QueueTimingPopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
