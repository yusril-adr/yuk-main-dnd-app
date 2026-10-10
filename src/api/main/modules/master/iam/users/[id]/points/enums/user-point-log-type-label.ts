import { UserPointLogTypeEnum } from "./user-point-log-type";

export const USER_POINT_LOG_TYPE_LABEL: Record<UserPointLogTypeEnum, string> = {
  [UserPointLogTypeEnum.INCOME]: "Income",
  [UserPointLogTypeEnum.EXPENSE]: "Expense",
};
