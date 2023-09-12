import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupRegistrationComponent } from './pages/group-registration/group-registration.component';
import { QueueRegistrationComponent } from './pages/queue-registration/queue-registration.component';
import { RegistrationPreviewComponent } from './pages/registration-preview/registration-preview.component';
import { RouterModule } from '@angular/router';
import { eventRegisterRoutes } from './events-register.routing';
import { GroupRegisterInviteComponent } from './components/group-register-invite/group-register-invite.component';



@NgModule({
  declarations: [
    GroupRegistrationComponent,
    QueueRegistrationComponent,
    RegistrationPreviewComponent,
    GroupRegisterInviteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(eventRegisterRoutes)
  ]
})
export class EventsRegisterModule { }
