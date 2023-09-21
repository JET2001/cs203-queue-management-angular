import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.loginFG = this.fb.group({
      email: this.emailFC,
      mobile: this.mobileFC,
      password: this.passwordFC,
      checkbox: this.checkboxFC,
    });
  }

  ngOnInit(): void {
  }

  handleLogin(): void {
    console.log(this.loginFG.value)
  }
}
