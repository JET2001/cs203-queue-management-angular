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

  constructor(private fb: FormBuilder) {
    this.cardNumberFC = new FormControl('', []);
    this.cardNumberFG = fb.group(this.cardNumberFC);
  }



}
