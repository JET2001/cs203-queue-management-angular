import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewEventInfoComponent } from './pages/view-event-info/view-event-info.component';
import { RouterModule } from '@angular/router';
import { eventRoutes } from './events.routing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';



@NgModule({
  declarations: [
    ViewEventInfoComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(eventRoutes)
  ]
})
export class EventsModule { }
