import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StoreUserInfoService } from 'src/app/shared/services/store-user-info/store-user-info.service';
import { Card } from './../../../../models/card';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-payment-validation',
  templateUrl: './payment-validation.component.html',
  styleUrls: ['./payment-validation.component.scss'],
})
export class PaymentValidationComponent {
  cardNumberFG: FormGroup;
  cardNumberFC: FormControl;
  expDateFC: FormControl;
  // cvvFC: FormControl;
  billingFG: FormGroup;
  nameFC: FormControl;
  streetFC: FormControl;
  cityFC: FormControl;
  stateFC: FormControl;
  zipFC: FormControl;
  emailFC: FormControl;
  mobileFC: FormControl;

  constructor(
    private fb: FormBuilder,
    private storeUserInfoService: StoreUserInfoService,
    private authService: AuthenticationService
  ) {
    this.cardNumberFC = new FormControl('', []);
    this.expDateFC = new FormControl('', []);
    // this.cvvFC = new FormControl('', []);
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
      // this.cvvFC,
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

  public showSaveButton(): boolean {
    if (
      this.cardNumberFG.invalid ||
      this.billingFG.invalid ||
      this.cardNumberFG.untouched
    )
      return false;
    return true;
  }

  public saveCard(): void {
    const card: Card = {
      userID: this.authService.userID!,
      cardNumber: this.cardNumberFC.value,
      expDate: this.expDateFC.value,
      name: this.nameFC.value,
      street: this.streetFC.value,
      city: this.cityFC.value,
      state: this.stateFC.value,
      zip: this.zipFC.value,
      email: this.emailFC.value,
      mobile: this.mobileFC.value,
    };
    console.log(this.authService.user!);
    this.storeUserInfoService.storePaymentInfo(card).subscribe(() => {});
  }
}
