import { UserExpLogDirectionEnum } from "./user-exp-log-direction";

export const USER_EXP_LOG_DIRECTION_LABEL: Record<
  UserExpLogDirectionEnum,
  string
> = {
  [UserExpLogDirectionEnum.INCOME]: "Income",
  [UserExpLogDirectionEnum.EXPENSE]: "Expense",
};
