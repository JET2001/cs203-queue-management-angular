import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewEventInfoComponent } from './pages/view-event-info/view-event-info.component';



@NgModule({
  declarations: [
    ViewEventInfoComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class EventsModule { }
