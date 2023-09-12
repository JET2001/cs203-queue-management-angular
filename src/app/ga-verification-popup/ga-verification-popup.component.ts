import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ga-verification-popup',
  templateUrl: './ga-verification-popup.component.html',
  styleUrls: ['./ga-verification-popup.component.scss'],
})
export class GaVerificationPopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
