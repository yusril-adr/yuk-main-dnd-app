import { useMemo } from "react";

import type { UserExpLogDirectionEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-direction";
import type { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { OrderKeyEnum } from "@/common/enums/order-key";

import BalanceLogList from "@/app/(authenticated)/balances/_components/balance-log-list";
import { useGetMyExperiencePointPagination } from "@/app/(authenticated)/balances/_hooks/use-get-my-experience-point-pagination";
import {
  BALANCE_EXP_DIRECTION_LABEL,
  BALANCE_EXP_DIRECTION_OPTIONS,
  BALANCE_EXP_TYPE_LABEL,
  BALANCE_EXP_TYPE_OPTIONS,
  BALANCE_FILTER_ALL,
  BALANCE_PAGE_SIZE,
} from "@/app/(authenticated)/balances/_constants/balance";
import {
  getSignedExpAmount,
  toTypeOrNull,
} from "@/app/(authenticated)/balances/_utils/balance-helper";
import type {
  TBalanceLogItem,
  TBalanceLogPanelProps,
} from "@/app/(authenticated)/balances/_types/balance-components-props";

const TYPE_ITEMS = [
  { label: "All experience", value: BALANCE_FILTER_ALL },
  ...BALANCE_EXP_TYPE_OPTIONS.map((type) => ({
    label: BALANCE_EXP_TYPE_LABEL[type],
    value: String(type),
  })),
];

const DIRECTION_ITEMS = [
  { label: "Earned & spent", value: BALANCE_FILTER_ALL },
  ...BALANCE_EXP_DIRECTION_OPTIONS.map((direction) => ({
    label: BALANCE_EXP_DIRECTION_LABEL[direction],
    value: String(direction),
  })),
];

export default function BalanceExperiencePanel({
  page,
  type,
  direction,
  onPageChange,
  onTypeChange,
  onDirectionChange,
  onFilterReset,
}: TBalanceLogPanelProps) {
  const { data, isPending, isError, refetch } =
    useGetMyExperiencePointPagination({
      page,
      per_page: BALANCE_PAGE_SIZE,
      sort_by: "created_at",
      order: OrderKeyEnum.DESC,
      type: (type ?? undefined) as UserExpLogTypeEnum | undefined,
      direction: (direction ?? undefined) as
        | UserExpLogDirectionEnum
        | undefined,
    });

  const items: TBalanceLogItem[] = useMemo(
    () =>
      (data?.data?.data?.items ?? []).map((log) => ({
        id: log.id,
        createdAt: log.created_at,
        typeLabel: BALANCE_EXP_TYPE_LABEL[log.type] ?? "Experience",
        description: log.description,
        amount: getSignedExpAmount(log.amount, log.direction),
        unit: "EXP",
      })),
    [data],
  );
  const meta = data?.data?.data?.meta;

  return (
    <BalanceLogList
      data={items}
      isLoading={isPending}
      isError={isError}
      isFiltered={type != null || direction != null}
      page={page}
      pageCount={meta?.total_page || 1}
      rowCount={meta?.total_all_data || 0}
      typeItems={TYPE_ITEMS}
      typeValue={type != null ? String(type) : BALANCE_FILTER_ALL}
      typeAriaLabel="Experience type"
      directionItems={DIRECTION_ITEMS}
      directionValue={
        direction != null ? String(direction) : BALANCE_FILTER_ALL
      }
      directionAriaLabel="Experience direction"
      onDirectionChange={(value) => onDirectionChange(toTypeOrNull(value))}
      emptyTitle="No experience yet"
      emptyDescription="EXP you earn or spend as a player or dungeon master will be recorded here."
      onTypeChange={(value) => onTypeChange(toTypeOrNull(value))}
      onRetry={() => refetch()}
      onReset={onFilterReset}
      onPageChange={onPageChange}
    />
  );
}
