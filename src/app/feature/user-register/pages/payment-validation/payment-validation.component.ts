import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
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

  constructor(private fb: FormBuilder) {
    this.cardNumberFC = new FormControl('', []);
    this.expDateFC = new FormControl('', []);
    this.cvvFC = new FormControl('', []);
    this.cardNumberFG = fb.group([this.cardNumberFC, this.expDateFC, this.cvvFC]);
  }



}
