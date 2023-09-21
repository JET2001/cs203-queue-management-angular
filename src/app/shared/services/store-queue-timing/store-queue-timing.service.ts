import { Injectable } from '@angular/core';

export interface QueueTimingInfoParams {
  eventID?: number;
  userID?: number;
  selectedQueueIDs?: number[];
  selectedQueueTimings?: string[]; 
  groupID?: number;
}

@Injectable({
  providedIn: 'root',
})
export class StoreQueueTimingService {
    private _queueTimingInfo: QueueTimingInfoParams;

    public get queueTimingPreferences(): QueueTimingInfoParams{
        return this._queueTimingInfo;
    }

    public set queueTimingPreferences(params: QueueTimingInfoParams) {
        this._queueTimingInfo = params;
    }
}
