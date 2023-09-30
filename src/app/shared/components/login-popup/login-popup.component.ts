import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { GetUserInfoService } from '../../services/get-user-info/get-user-info.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  loginFG: FormGroup;
  emailFC: FormControl = new FormControl('', []);
  mobileFC: FormControl = new FormControl('', []);
  passwordFC: FormControl = new FormControl('', []);
  checkboxFC: FormControl = new FormControl(false);

  // Error message fields
  showInvalidLoginMessage: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private getUserInfoService: GetUserInfoService
  ) {
    this.loginFG = this.fb.group({
      email: this.emailFC,
      mobile: this.mobileFC,
      password: this.passwordFC,
      checkbox: this.checkboxFC,
    });
  }

  ngOnInit(): void {}

  loginUser(): void {
    if (!this._fieldsAllValid()) return;

    // Process mobile number.
    let mobile = this.processMobile();
    let email = this.emailFC.value;
    this.authService
      .login(this.emailFC.value, mobile, this.passwordFC.value)
      .subscribe(
        (data: string | boolean) => {
          // User gets a JWT token
          // console.log(data);
          if (typeof data == typeof '') {
            this.authService.saveAuthToken(JSON.parse(JSON.stringify(data)));

            // Hardcoded user, we got CORS errors.
            // const user: User = {
            //   userID : "2",
            //   mobileNo : "06598231539",
            //   email : "jrteo.2022@smu.edu.sg",
            //   authenticatorID: "002",
            //   "isVerified": true
            // };
            // console.log(user);

            // this.authService.user = user;

            // this.loginFG.reset();
            // // Dismiss this active modal
            // this.activeModal.dismiss();
            // // Authenticate user
            // this.authService.authenticateUser().then((data: boolean) => {
            //   // Log in user
            //   this.authService.email = email;
            // });

            // Make another call to get the user object --> quite inefficient for now. But possibly can refactor.
            this.getUserInfoService.loadUserInfo(email).subscribe(
              (data: any) => {
                const user: User = {
                  userID : data.id,
                  mobileNo: data.mobile,
                  email : data.email,
                  authenticatorID: data.authenticatorId,
                  isVerified: data.verified
                };
                console.log(user);

                this.authService.user = user;

                this.loginFG.reset();
                // Dismiss this active modal
                this.activeModal.dismiss();
                // Authenticate user
                this.authService.authenticateUser().then((data: boolean) => {
                  // Log in user
                  this.authService.email = email;
                });
              }
            );

            this.loginFG.reset();
            // Dismiss this active modal
            this.activeModal.dismiss();

            // Authenticate user
            this.authService.authenticateUser().then((data: boolean) => {
              // Log in user
              this.authService.email = email;
            });

            // return;
          } else {
            this.showInvalidLoginMessage = true;
            this.loginFG.reset();
          }
        },
        (error: Error) => {
          // console.log(error.message);
          // if (error.message)
        }
      );
  }

  private _fieldsAllValid(): boolean {
    for (let value of [
      this.emailFC.value,
      this.mobileFC.value,
      this.passwordFC.value,
    ]) {
      if (value == null || value == undefined || value == '') {
        this.showInvalidLoginMessage = true;
        return false;
      }
    }
    this.showInvalidLoginMessage = false;
    return true;
  }

  // Hide error message when fields are modified
  private _fieldsAreModified(): void {
    for (let fc of [this.emailFC, this.mobileFC, this.passwordFC]) {
      if (fc.dirty) this.showInvalidLoginMessage = false;
    }
  }

  private processMobile(): string {
    let mobile: string = this.mobileFC.value;
    mobile = mobile.replace('+', '0');
    return mobile;
  }
}
