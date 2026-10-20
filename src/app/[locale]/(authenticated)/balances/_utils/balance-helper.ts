import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";

import { BALANCE_FILTER_ALL } from "@/app/[locale]/(authenticated)/balances/_constants/balance";

// The API stores positive amounts; an expense is what makes gold negative
export function getSignedPointAmount(
  amount: number,
  type: UserPointLogTypeEnum,
) {
  const value = Math.abs(amount);
  return type === UserPointLogTypeEnum.EXPENSE ? -value : value;
}

export function toTypeOrNull(value: string | null) {
  return !value || value === BALANCE_FILTER_ALL ? null : Number(value);
}
