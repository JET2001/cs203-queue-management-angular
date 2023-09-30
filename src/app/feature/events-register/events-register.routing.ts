import { Routes } from "@angular/router";
import { GroupRegistrationComponent } from "./pages/group-registration/group-registration.component";
import { RegistrationPreviewComponent } from "./pages/registration-preview/registration-preview.component";
import { QueueTimingsComponent } from "./pages/queue-timings/queue-timings.component";
import { groupRegisterGuard, queueRegisterGuard, registrationPreviewGuard } from "./events-register.guards";

export const eventRegisterRoutes : Routes = [
  {
    path: 'group',
    component: GroupRegistrationComponent,
    canActivate: [groupRegisterGuard()]
  },
  {
    path: 'queue',
    component: QueueTimingsComponent,
    // canActivate:[queueRegisterGuard()]  //LEFT OUT FOR DEMO ONLY
  },
  {
    path: 'preview',
    component: RegistrationPreviewComponent,
    canActivate: [registrationPreviewGuard()]
  },
]
