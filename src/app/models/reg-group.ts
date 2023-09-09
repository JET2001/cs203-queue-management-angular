export interface RegGroup {
  groupID: number;
  userIDs: number[];

  size(): number {
    return userIDs.length;
  }
}
