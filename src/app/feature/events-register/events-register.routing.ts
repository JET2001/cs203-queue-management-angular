import { Routes } from "@angular/router";
import { GroupRegistrationComponent } from "./pages/group-registration/group-registration.component";
import { QueueRegistrationComponent } from "./pages/queue-registration/queue-registration.component";
import { RegistrationPreviewComponent } from "./pages/registration-preview/registration-preview.component";

export const eventRegisterRoutes : Routes = [
  {
    path: 'group',
    component: GroupRegistrationComponent
  },
  {
    path: 'queue',
    component: QueueRegistrationComponent
  },
  {
    path: 'preview',
    component: RegistrationPreviewComponent
  }
]
