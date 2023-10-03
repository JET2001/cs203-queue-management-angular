import { NgModule } from '@angular/core';
import { AccountCreationComponent } from './pages/account-creation/account-creation.component';
import { RouterModule } from '@angular/router';
import { userRegisterRoutes } from './user-register.routing';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailPopupComponent } from './components/verify-email-popup/verify-email-popup.component';

@NgModule({
  declarations: [AccountCreationComponent, VerifyEmailPopupComponent],
  imports: [
    RouterModule.forChild(userRegisterRoutes),
    CommonModule,
    SharedModule,
  ],
})
export class UserRegistrationModule {}
