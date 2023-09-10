export interface RegGroup {
  groupID: number;
  eventID: number;
  userIDs: number[];
  hasAllUsersConfirmed: boolean;
  queueIDs?: number[];
  purchaseID?: number;
  confirmed: number[];
}
