import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ga-registration-popup',
  templateUrl: './ga-registration-popup.component.html',
  styleUrls: ['./ga-registration-popup.component.scss']
})
export class GaRegistrationPopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
