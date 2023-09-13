import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ga-verification-popup',
  templateUrl: './ga-verification-popup.component.html',
  styleUrls: ['./ga-verification-popup.component.scss'],
})
export class GaVerificationPopupComponent {
  authenticationFC: FormControl = new FormControl('', []);
  isChecked: boolean = false;

  constructor(public activeModal: NgbActiveModal) {
  }

  handleAuthenticateClick(): void {
    if (this.authenticationFC.invalid) {
      // console.log('error');
    }
    else {
      // if (this.isChecked) console.log('checked');
      // console.log(this.authenticationFC.value);
      this.activeModal.dismiss('Cross click');
    }
  }
}
