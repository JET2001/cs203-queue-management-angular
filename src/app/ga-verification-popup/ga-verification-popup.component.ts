import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ga-verification-popup',
  templateUrl: './ga-verification-popup.component.html',
  styleUrls: ['./ga-verification-popup.component.scss'],
})
export class GaVerificationPopupComponent {
  authenticationFC: FormControl = new FormControl('', []);

  constructor(public activeModal: NgbActiveModal) {}

  handleAuthenticateClick(): void {
    if (this.authenticationFC.invalid) {
      // console.log('error');
    }
    else {
      // console.log(this.authenticationFC.value);
    }
  }
}
