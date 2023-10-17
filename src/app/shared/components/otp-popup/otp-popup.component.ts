import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-otp-popup',
  templateUrl: './otp-popup.component.html',
  styleUrls: ['./otp-popup.component.scss'],
})
export class OtpPopupComponent {
  @Output() mobileVerified: EventEmitter<boolean> = new EventEmitter<boolean>();
  otpFC: FormControl = new FormControl;
  constructor(public activeModal: NgbActiveModal) {}

  handleVerify(): void {
    // otp verification here
    this.mobileVerified.emit(true);
  }
}
