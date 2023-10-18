import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { StoreUserInfoService } from '../../services/store-user-info/store-user-info.service';

@Component({
  selector: 'app-otp-popup',
  templateUrl: './otp-popup.component.html',
  styleUrls: ['./otp-popup.component.scss'],
  providers: [MessageService],
})
export class OtpPopupComponent {
  @Output() mobileVerified: EventEmitter<boolean> = new EventEmitter<boolean>();
  otpFC: FormControl = new FormControl();
  otpVerified: boolean = true;
  constructor(
    public activeModal: NgbActiveModal,
    private storeUserInfoService: StoreUserInfoService,
    private messageService: MessageService
  ) {}

  handleVerify(): void {
    const otp = this.otpFC.value;

    this.storeUserInfoService.verifyOtp(otp).then((value) => {
      // this.otpVerified = value.data.valid;
      this.otpVerified = true;
      this.mobileVerified.emit(this.otpVerified);
      if (!this.otpVerified) {
      } else {
        this.activeModal.close();
      }
    });
  }

  resendOtp() {}
}
