import { useMemo } from "react";

import type { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { OrderKeyEnum } from "@/common/enums/order-key";

import BalanceLogList from "@/app/(authenticated)/balances/_components/balance-log-list";
import { useGetMyExperiencePointPagination } from "@/app/(authenticated)/balances/_hooks/use-get-my-experience-point-pagination";
import {
  BALANCE_EXP_TYPE_LABEL,
  BALANCE_EXP_TYPE_OPTIONS,
  BALANCE_FILTER_ALL,
  BALANCE_PAGE_SIZE,
} from "@/app/(authenticated)/balances/_constants/balance";
import { toTypeOrNull } from "@/app/(authenticated)/balances/_utils/balance-helper";
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

export default function BalanceExperiencePanel({
  page,
  type,
  onPageChange,
  onTypeChange,
}: TBalanceLogPanelProps) {
  const { data, isPending, isError, refetch } =
    useGetMyExperiencePointPagination({
      page,
      per_page: BALANCE_PAGE_SIZE,
      sort_by: "created_at",
      order: OrderKeyEnum.DESC,
      type: (type ?? undefined) as UserExpLogTypeEnum | undefined,
    });

  const items: TBalanceLogItem[] = useMemo(
    () =>
      (data?.data?.data?.items ?? []).map((log) => ({
        id: log.id,
        createdAt: log.created_at,
        typeLabel: BALANCE_EXP_TYPE_LABEL[log.type] ?? "Experience",
        description: log.description,
        amount: log.amount,
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
      isFiltered={type != null}
      page={page}
      pageCount={meta?.total_page || 1}
      rowCount={meta?.total_all_data || 0}
      typeItems={TYPE_ITEMS}
      typeValue={type != null ? String(type) : BALANCE_FILTER_ALL}
      typeAriaLabel="Experience type"
      emptyTitle="No experience yet"
      emptyDescription="EXP earned as a player or dungeon master will be recorded here."
      onTypeChange={(value) => onTypeChange(toTypeOrNull(value))}
      onRetry={() => refetch()}
      onReset={() => onTypeChange(null)}
      onPageChange={onPageChange}
    />
  );
}
