import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerifyEmailPopupComponent } from './components/verify-email-popup/verify-email-popup.component';
import { AccountCreationComponent } from './pages/account-creation/account-creation.component';
import { PaymentValidationComponent } from './pages/payment-validation/payment-validation.component';
import { userRegisterRoutes } from './user-register.routing';
import { SetupPaymentPopupComponent } from './components/setup-payment-popup/setup-payment-popup.component';

@NgModule({
  declarations: [AccountCreationComponent, VerifyEmailPopupComponent, PaymentValidationComponent, SetupPaymentPopupComponent],
  imports: [
    RouterModule.forChild(userRegisterRoutes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UserRegistrationModule {}
