import { User } from "../user";
import { UserDTO } from "./user-dto";


export interface RegGroupDTOReq {
  userGroup: UserDTO[];
  groupLeaderEmail: string;
  eventId: string;
}

export interface RegGroupDTOResp {
  regGroupID?: string;
  userGroup: User[];
  eventId: string;
  groupSize?: number;
  groupLeaderUserId: string;
  groupLeaderEmail: string;
}
