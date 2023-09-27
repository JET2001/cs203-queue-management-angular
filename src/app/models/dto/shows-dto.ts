import { QueueDTO } from "./queues-dto";

export interface ShowDTO {
  showID : string;
  showDateTime: Date;
  locationName: string;
  venueId: string;
  queues: QueueDTO[];
}
