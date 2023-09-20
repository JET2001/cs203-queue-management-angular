import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewEventInfoComponent } from './pages/view-event-info/view-event-info.component';
import { RouterModule } from '@angular/router';
import { eventRoutes } from './events.routing';
import { GroupMemberListComponent } from './components/group-member-list/group-member-list.component';
import { ViewShowsComponent } from './components/view-shows/view-shows.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ViewEventInfoComponent,
    GroupMemberListComponent,
    ViewShowsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(eventRoutes),
    TableModule,
    InputTextModule
  ]
})
export class EventsModule {}
