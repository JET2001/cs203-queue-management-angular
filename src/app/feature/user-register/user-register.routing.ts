import { Routes } from '@angular/router';
import { AccountCreationComponent } from './pages/account-creation/account-creation.component';
import { PaymentValidationComponent } from './pages/payment-validation/payment-validation.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { logInGuard } from './user-register.guards';

export const userRegisterRoutes: Routes = [
  {
    path: 'register',
    component: AccountCreationComponent,
  },
  {
    path: 'payment-setup',
    component: PaymentValidationComponent,
    canActivate: [logInGuard()],
  },
  {
    //user/verify/token/db3548af-b826-4182-ac34-7f9d623a76fa
    path: 'verify/token/:token',
    component: VerifyEmailComponent,
    canActivate: [logInGuard()],
  },
];
