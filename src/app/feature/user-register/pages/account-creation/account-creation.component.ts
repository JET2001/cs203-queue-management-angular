import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpPopupComponent } from 'src/app/shared/components/otp-popup/otp-popup.component';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { StoreUserInfoService } from 'src/app/shared/services/store-user-info/store-user-info.service';
import { VerifyEmailPopupComponent } from '../../components/verify-email-popup/verify-email-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { StatusCommunicationService } from 'src/app/core/services/status-communication/status-communication.service';
import { NO_CONNECTION_MESSAGE } from 'src/app/core/constants/error-messages';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  showOTPButton: boolean = false;
  userHasExistingAccount: boolean = false;
  mobileNumberExists: boolean = false;
  passwordsMatch: boolean = true;
  otpVerified: boolean = false;
  signUpForm: FormGroup;
  emailFC: FormControl = new FormControl('');
  mobileFC: FormControl = new FormControl('');
  password1FC: FormControl = new FormControl('');
  password2FC: FormControl = new FormControl('');

  constructor(
    protected override spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private getUserInfoService: GetUserInfoService,
    private ngbModal: NgbModal,
    private storeUserInfoService: StoreUserInfoService,
    private messageService: MessageService,
    private statusCommunicationService: StatusCommunicationService
  ) {
    super(spinner);
    this.signUpForm = fb.group({});
  }

  ngOnInit(): void {
    this.signUpForm.addControl('email', this.emailFC);
    this.signUpForm.addControl('mobile', this.mobileFC);
    this.signUpForm.addControl('password1', this.password1FC);
    this.signUpForm.addControl('password2', this.password2FC);
    this.spinnerHide();

    if (this.statusCommunicationService.hasMessage) {
      this.messageService.add(this.statusCommunicationService.message!);
    }
  }

  ngAfterViewInit(): void {
    this.signUpForm.get('email')?.valueChanges.subscribe((value) => {
      this.verifyEmail();
    });
    this.signUpForm.get('mobile')?.valueChanges.subscribe((value) => {
      this.handleShowOTPButton();
    });
    this.signUpForm.get('password2')?.valueChanges.subscribe((value) => {
      this.checkIfPasswordsMatch();
      this.checkNextButton();
    });
  }

  async verifyEmail() {
    if (this.signUpForm.get('email')?.valid) {
      this.getUserInfoService
        .loadUserInfo(this.signUpForm.get('email')?.value)
        .subscribe(
          (value) => {
            if (value) {
              this.userHasExistingAccount = true;
            }
          },
          (error: HttpErrorResponse) => this._handleError(error)
        );
    }
  }

  checkIfPasswordsMatch(): void {
    if (
      this.signUpForm.get('password1')?.value !==
      this.signUpForm.get('password2')?.value
    ) {
      this.passwordsMatch = false;
    } else {
      this.passwordsMatch = true;
    }
  }

  async handleShowOTPButton() {
    if (this.signUpForm.get('mobile')?.valid) {
      this.getUserInfoService
        .existingMobileNumber(this.signUpForm.get('mobile')?.value)
        .subscribe(
          (value) => {
            console.log(value);
            if (value) {
              this.mobileNumberExists = true;
              this.showOTPButton = false;
            } else {
              this.mobileNumberExists = false;
              this.showOTPButton = true;
            }
          },
          (error: HttpErrorResponse) => this._handleError(error)
        );
    } else {
      this.mobileNumberExists = false;
    }
  }

  showOTPPopup(): void {
    this.storeUserInfoService.sendOtp(this.signUpForm.get('mobile')?.value);
    const modalRef = this.ngbModal.open(OtpPopupComponent, { centered: true });
    modalRef.componentInstance.mobileVerified.subscribe((value: boolean) => {
      this.otpVerified = value;
      if (this.otpVerified) {
        this.showOTPButton = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Mobile number successfully verified',
        });
      }
    });
  }

  checkNextButton(): boolean {
    if (
      !this.userHasExistingAccount &&
      this.passwordsMatch &&
      this.otpVerified &&
      !this.mobileNumberExists &&
      this.signUpForm.get('password2')?.value !== '' &&
      this.signUpForm.get('mobile')?.value !== ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  saveData(): void {
    this.storeUserInfoService.createNewUser(
      this.signUpForm.get('email')?.value,
      this.signUpForm.get('mobile')?.value,
      this.signUpForm.get('password2')?.value
    );
    this.openVerificationModal();
  }

  openVerificationModal(): void {
    const modalRef = this.ngbModal.open(VerifyEmailPopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.email = this.signUpForm.get('email')?.value;
  }

  private _handleError(error: HttpErrorResponse): void {
    let message: string = '';
    if (error.status == 0) message = NO_CONNECTION_MESSAGE;
    else message = error.message;

    this.messageService.add({
      severity: 'error',
      summary: message,
    });
  }
}
