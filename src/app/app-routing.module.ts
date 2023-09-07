import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  // routing to home page
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  // event-routing
  {
    path: 'events',
    loadChildren: () => import('./feature/events/events.module').then(m => m.EventsModule)
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  }
];
