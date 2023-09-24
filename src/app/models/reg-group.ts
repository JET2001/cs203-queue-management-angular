export interface RegGroup {
  groupID: string;
  eventID: string;
  userIDs: string[];
  hasAllUsersConfirmed: boolean;
  queueIDs?: string[];
  purchaseID?: number;
  confirmed: number[];
}
