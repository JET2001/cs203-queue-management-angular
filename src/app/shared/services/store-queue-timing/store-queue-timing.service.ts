import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from 'src/app/core/services/base-rest-api/base-rest-api.service';
import { QueueDTOReq, QueueDTOResp } from 'src/app/models/dto/queues-dto';

// export interface QueueTimingInfoParams {
//   eventID?: string;
//   userID?: string;
//   selectedQueueIDs?: string[];
//   selectedQueueTimings?: string[];
//   groupID?: string;
// }

@Injectable({
  providedIn: 'root',
})
export class StoreQueueTimingService extends BaseRestApiService {
  private _queueTimingDTO: QueueDTOReq;

  // Store selection strings for confirmation screen display
  private _selectionStrings: string[];

  constructor (protected override http: HttpClient) {
    super(http);
  }
  public setQueueTimingPreferences(groupId: string, userId: string, eventId: string, queueShowList: QueueDTOResp[]): void {
    this._queueTimingDTO = {
      groupId: groupId,
      userId: userId,
      eventId: eventId,
      queueIdList: [],
      showIdList: []
    };

    for (let queueShowObj of queueShowList){
      this._queueTimingDTO.queueIdList.push(queueShowObj.queueId);
      this._queueTimingDTO.showIdList.push(queueShowObj.showId);
    }
  }

  public set selectionStrings(selectionStrings: string[]) {
    this._selectionStrings = selectionStrings;
  }

  public get selectionStrings(): string[] {
    return this._selectionStrings;
  }

  public confirmQueueTimingsForGroup(): Observable<any> {
    return this.post('queues/register', this._queueTimingDTO);
  }
}
