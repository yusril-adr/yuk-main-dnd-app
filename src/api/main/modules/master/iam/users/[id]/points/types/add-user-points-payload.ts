import type { UserPointLogTypeEnum } from "../enums/user-point-log-type";

// amount is an integer from 1 through 2147483647. Direction is type, not the sign.
// INCOME adds amount to points. EXPENSE subtracts amount.
// EXPENSE with balance < amount returns 400 "User does not have enough points".
// Omit description; do not send null.
export type TAddUserPointsPayload = {
  type: UserPointLogTypeEnum;
  amount: number;
  description?: string;
};
