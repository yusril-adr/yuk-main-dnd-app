import { UserExpLogDirectionEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-direction";
import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";

export const BALANCE_PAGE_SIZE = 10;

export const BALANCE_FILTER_ALL = "all";

export const BALANCE_DATE_FORMAT = "DD MMM YYYY, HH:mm";

export const BALANCE_TAB = {
  EXPERIENCE: "experience",
  GOLD: "gold",
} as const;

export const BALANCE_TAB_OPTIONS = [
  BALANCE_TAB.EXPERIENCE,
  BALANCE_TAB.GOLD,
] as const;

export const BALANCE_EXP_TYPE_OPTIONS = [
  UserExpLogTypeEnum.PLAYER,
  UserExpLogTypeEnum.DM,
] as const;

export const BALANCE_EXP_DIRECTION_OPTIONS = [
  UserExpLogDirectionEnum.INCOME,
  UserExpLogDirectionEnum.EXPENSE,
] as const;

export const BALANCE_POINT_TYPE_OPTIONS = [
  UserPointLogTypeEnum.INCOME,
  UserPointLogTypeEnum.EXPENSE,
] as const;

// Human labels shown on each log row
export const BALANCE_EXP_TYPE_LABEL: Record<UserExpLogTypeEnum, string> = {
  [UserExpLogTypeEnum.PLAYER]: "Player EXP",
  [UserExpLogTypeEnum.DM]: "Dungeon Master EXP",
};

export const BALANCE_EXP_DIRECTION_LABEL: Record<
  UserExpLogDirectionEnum,
  string
> = {
  [UserExpLogDirectionEnum.INCOME]: "EXP earned",
  [UserExpLogDirectionEnum.EXPENSE]: "EXP spent",
};

export const BALANCE_POINT_TYPE_LABEL: Record<UserPointLogTypeEnum, string> = {
  [UserPointLogTypeEnum.INCOME]: "Gold earned",
  [UserPointLogTypeEnum.EXPENSE]: "Gold spent",
};
