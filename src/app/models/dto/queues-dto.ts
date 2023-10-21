

export interface QueueDTO {
  showID: string;
  queueID: string;
  queueStartTime: Date;
  queueEndTime: Date;
  location?: string;
}


export interface QueueDTOReq {
  groupId: string;
  userId: string;
  eventId: string;
  queueIdList: string[];
  showIdList: string[];
}

export interface QueueDTOResp {
  queueId: string;
  queueStartTime: string;
  queueEndTime: string;
  showId: string;
  eventId: string;
  showDateTime: string;
  locationName?: string;
}
