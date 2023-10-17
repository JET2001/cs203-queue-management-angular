import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-payment-validation',
  templateUrl: './payment-validation.component.html',
  styleUrls: ['./payment-validation.component.scss'],
})
export class PaymentValidationComponent {
  cardNumberFG: FormGroup;
  cardNumberFC: FormControl;
  expDateFC: FormControl;
  cvvFC: FormControl;
  billingFG: FormGroup;
  nameFC: FormControl;
  streetFC: FormControl;
  cityFC: FormControl;
  stateFC: FormControl;
  zipFC: FormControl;
  emailFC: FormControl;
  mobileFC: FormControl;

  constructor(private fb: FormBuilder) {
    this.cardNumberFC = new FormControl('', []);
    this.expDateFC = new FormControl('', []);
    this.cvvFC = new FormControl('', []);
    this.nameFC = new FormControl('', []);
    this.streetFC = new FormControl('', []);
    this.cityFC = new FormControl('', []);
    this.stateFC = new FormControl('', []);
    this.zipFC = new FormControl('', []);
    this.emailFC = new FormControl('', []);
    this.mobileFC = new FormControl('', []);
    this.cardNumberFG = fb.group([
      this.cardNumberFC,
      this.expDateFC,
      this.cvvFC,
    ]);
    this.billingFG = fb.group([
      this.nameFC,
      this.streetFC,
      this.cityFC,
      this.stateFC,
      this.zipFC,
      this.emailFC,
      this.mobileFC,
    ]);
  }

  
}
