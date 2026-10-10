import { UserExpLogTypeEnum } from "./user-exp-log-type";

export const USER_EXP_LOG_TYPE_LABEL: Record<UserExpLogTypeEnum, string> = {
  [UserExpLogTypeEnum.PLAYER]: "Player",
  [UserExpLogTypeEnum.DM]: "DM",
};
