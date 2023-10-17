import { Routes } from "@angular/router";
import { AccountCreationComponent } from "./pages/account-creation/account-creation.component";
import { PaymentValidationComponent } from "./pages/payment-validation/payment-validation.component";
import { VerifyEmailComponent } from "./pages/verify-email/verify-email.component";

export const userRegisterRoutes: Routes = [
    {
        path: 'register',
        component: AccountCreationComponent
    }, {
        path: 'card-setup',
        component: PaymentValidationComponent
    }, {
        path: 'verify-email',
        component: VerifyEmailComponent
    }
]