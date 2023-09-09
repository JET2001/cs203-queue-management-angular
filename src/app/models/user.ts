export interface User {
  userID: number;
  mobileNo: string;
  email: string;
  password: string;
  authenticatorID?: string;
  isVerified: boolean;
}
