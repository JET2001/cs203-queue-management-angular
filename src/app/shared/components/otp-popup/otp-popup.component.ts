import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { StoreUserInfoService } from '../../services/store-user-info/store-user-info.service';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-otp-popup',
  templateUrl: './otp-popup.component.html',
  styleUrls: ['./otp-popup.component.scss'],
  providers: [MessageService],
})
export class OtpPopupComponent extends BaseComponent {
  @Output() mobileVerified: EventEmitter<boolean> = new EventEmitter<boolean>();
  otpFC: FormControl = new FormControl();
  otpVerified: boolean = true;
  constructor(
    protected override spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private storeUserInfoService: StoreUserInfoService,
    private messageService: MessageService
  ) {
    super(spinner);
  }

  handleVerify(): void {
    const otp = this.otpFC.value;
    this.spinnerShow();
    this.storeUserInfoService.verifyOtp(otp).then((value) => {
      this.otpVerified = value.data.valid;
      this.mobileVerified.emit(this.otpVerified);
      if (!this.otpVerified) {
      } else {
        this.activeModal.close();
      }
      this.spinnerHide();
    });
  }

  resendOtp() {}
}
