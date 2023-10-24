export interface User {
  userID: string;
  mobileNo: string;
  email: string;
  password?: string;
  authenticatorID?: string;
  isVerified: boolean;
  isPaymentVerified?: boolean;
  confirmed?: boolean;
  allowLogin?: boolean;
}
