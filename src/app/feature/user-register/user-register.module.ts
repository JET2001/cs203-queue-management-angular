import { NgModule } from '@angular/core';
import { AccountCreationComponent } from './pages/account-creation/account-creation.component';
import { RouterModule } from '@angular/router';
import { userRegisterRoutes } from './user-register.routing';

@NgModule({
  declarations: [AccountCreationComponent],
  imports: [RouterModule.forChild(userRegisterRoutes)],
})
export class UserRegistrationModule {}
