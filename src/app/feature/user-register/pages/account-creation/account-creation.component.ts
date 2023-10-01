import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent implements OnInit {
  showOTPButton: boolean = false;
  userHasExistingAccount: boolean = false;
  // to check if mobile number exists
  mobileNumberExists: boolean = false;
  passwordsMatch: boolean = true;
  otpVerified: boolean = false;
  signUpForm: FormGroup;
  emailFC: FormControl = new FormControl('');
  mobileFC: FormControl = new FormControl('');
  password1FC: FormControl = new FormControl('');
  password2FC: FormControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private getUserInfoService: GetUserInfoService
  ) {
    this.signUpForm = fb.group({});
  }

  ngOnInit(): void {
    this.signUpForm.addControl('email', this.emailFC);
    this.signUpForm.addControl('mobile', this.mobileFC);
    this.signUpForm.addControl('password1', this.password1FC);
    this.signUpForm.addControl('password2', this.password2FC);
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
      await this.getUserInfoService
        .loadUserInfo(this.signUpForm.get('email')?.value)
        .subscribe((value) => {
          if (value) {
            this.userHasExistingAccount = true;
          }
        });
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
      await this.getUserInfoService
        .existingMobileNumber(this.signUpForm.get('mobile')?.value)
        .then((value) => {
          if (value) {
            this.mobileNumberExists = true;
            this.showOTPButton = false;
          } else {
            this.mobileNumberExists = false;
            this.showOTPButton = true;
          }
        });
    }
  }

  checkNextButton(): boolean {
    // temporary, until we implement OTP
    this.otpVerified = true;
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
}
