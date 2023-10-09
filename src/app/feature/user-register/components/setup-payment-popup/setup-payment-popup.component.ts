import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-setup-payment-popup',
  templateUrl: './setup-payment-popup.component.html',
  styleUrls: ['./setup-payment-popup.component.scss'],
})
export class SetupPaymentPopupComponent {
  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  routeToPaymentSetup(): void {
    this.router.navigate(['/user/card-setup']);
  }
}
