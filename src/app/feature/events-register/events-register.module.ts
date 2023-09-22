import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupRegisterInviteComponent } from './components/group-register-invite/group-register-invite.component';
import { eventRegisterRoutes } from './events-register.routing';
import { GroupRegistrationComponent } from './pages/group-registration/group-registration.component';
import { RegistrationPreviewComponent } from './pages/registration-preview/registration-preview.component';
import { QueueTimingPopupComponent } from './components/registration-confirmation-popup/queue-timing-popup';
import { ReactiveFormsModule } from '@angular/forms';
import { QueueTimingsComponent } from './pages/queue-timings/queue-timings.component';
import { GaRegistrationPopupComponent } from './components/ga-registration-popup/ga-registration-popup.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    GroupRegistrationComponent,
    RegistrationPreviewComponent,
    GroupRegisterInviteComponent,
    QueueTimingPopupComponent,
    QueueTimingsComponent,
    GaRegistrationPopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(eventRegisterRoutes),
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class EventsRegisterModule { }
