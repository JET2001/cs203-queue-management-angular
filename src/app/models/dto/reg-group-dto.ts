import { User } from "../user";
import { QueueDTO } from "./queues-dto";
import { UserDTO } from "./user-dto";


export interface RegGroupDTOReq {
  userGroup: UserDTO[];
  groupLeaderEmail: string;
  eventId: string;
}

export interface RegGroupDTOResp {
  regGroupID?: string;
  purchaseID?: string;
  userGroup: User[];
  eventId?: string;
  groupSize?: number;
  groupLeaderUserId: string;
  groupLeaderEmail?: string;
  hasAllUsersConfirmed? : boolean;
  queueList?: QueueDTO[];

}
