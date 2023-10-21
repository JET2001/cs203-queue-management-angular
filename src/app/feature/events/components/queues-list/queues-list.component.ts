import { Component, Input } from '@angular/core';
import { QueueDTO } from 'src/app/models/dto/queues-dto';

@Component({
  selector: 'app-queues-list',
  templateUrl: './queues-list.component.html',
  styleUrls: ['./queues-list.component.scss']
})
export class QueuesListComponent {
  @Input() queueList: QueueDTO[];


}
