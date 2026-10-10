import type { UserExpLogTypeEnum } from "../enums/user-exp-log-type";

// amount is an integer from 1 through 2147483647. Never send a negative.
// PLAYER credits player_exp. DM credits dm_exp. Both only add.
// Omit description; do not send null.
export type TAddUserExperiencePointsPayload = {
  type: UserExpLogTypeEnum;
  amount: number;
  description?: string;
};
