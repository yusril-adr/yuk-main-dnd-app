export const USER_BALANCE_LOG_SORT_BY = [
  "id",
  "amount",
  "type",
  "description",
  "created_at",
  "updated_at",
] as const;

export type TUserBalanceLogSortBy = (typeof USER_BALANCE_LOG_SORT_BY)[number];
