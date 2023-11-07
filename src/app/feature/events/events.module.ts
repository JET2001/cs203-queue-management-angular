import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupMemberListComponent } from './components/group-member-list/group-member-list.component';
import { ViewShowsComponent } from './components/view-shows/view-shows.component';
import { eventRoutes } from './events.routing';
import { ViewEventInfoComponent } from './pages/view-event-info/view-event-info.component';
import { QueuesListComponent } from './components/queues-list/queues-list.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ViewEventInfoComponent,
    GroupMemberListComponent,
    ViewShowsComponent,
    QueuesListComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(eventRoutes),
    TableModule,
    InputTextModule,
    StepsModule,
  ],
  providers: [
    HttpClient,
    MessageService
  ]
})
export class EventsModule {}
