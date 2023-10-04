import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verify-email-popup',
  templateUrl: './verify-email-popup.component.html',
  styleUrls: ['./verify-email-popup.component.scss']
})
export class VerifyEmailPopupComponent {
  email: string;
  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  routeBackToHome(): void {
    this.router.navigate(['/home']);
  }
}
