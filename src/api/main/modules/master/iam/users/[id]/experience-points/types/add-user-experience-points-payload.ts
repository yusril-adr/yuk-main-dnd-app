import type { UserExpLogDirectionEnum } from "../enums/user-exp-log-direction";
import type { UserExpLogTypeEnum } from "../enums/user-exp-log-type";

// amount is an integer from 1 through 2147483647. Never send a negative.
// PLAYER changes player_exp. DM changes dm_exp.
// direction: INCREMENT (default when omitted) adds amount. DECREMENT subtracts it;
// EXP < amount returns 400 "User does not have enough experience".
// Omit description; do not send null.
export type TAddUserExperiencePointsPayload = {
  type: UserExpLogTypeEnum;
  direction?: UserExpLogDirectionEnum;
  amount: number;
  description?: string;
};
