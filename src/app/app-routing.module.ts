import { Routes } from '@angular/router';
import { eventRegisterGuard } from './feature/events-register/events-register.guards';

export const appRoutes: Routes = [
  // routing to home page
  {
    path: 'home',
    loadChildren: () =>
      import('./feature/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // event-routing
  {
    path: 'events',
    loadChildren: () =>
      import('./feature/events/events.module').then((m) => m.EventsModule),
  },
  // event-register routing
  {
    path: 'events/register',
    canActivateChild: [eventRegisterGuard()],
    loadChildren: () =>
      import('./feature/events-register/events-register.module').then(
        (m) => m.EventsRegisterModule
      ),
  },
  // user-register
  {
    path: 'user',
    loadChildren: () =>
      import('./feature/user-register/user-register.module').then(
        (m) => m.UserRegistrationModule
      ),
  },
  // Route all other paths to home page.
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
