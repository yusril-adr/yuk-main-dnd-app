import { useMemo } from "react";

import type { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";
import { OrderKeyEnum } from "@/common/enums/order-key";

import BalanceLogList from "@/app/(authenticated)/balances/_components/balance-log-list";
import { useGetMyPointPagination } from "@/app/(authenticated)/balances/_hooks/use-get-my-point-pagination";
import {
  BALANCE_POINT_TYPE_LABEL,
  BALANCE_POINT_TYPE_OPTIONS,
  BALANCE_FILTER_ALL,
  BALANCE_PAGE_SIZE,
} from "@/app/(authenticated)/balances/_constants/balance";
import {
  getSignedPointAmount,
  toTypeOrNull,
} from "@/app/(authenticated)/balances/_utils/balance-helper";
import type {
  TBalanceLogItem,
  TBalanceLogPanelProps,
} from "@/app/(authenticated)/balances/_types/balance-components-props";

const TYPE_ITEMS = [
  { label: "All gold", value: BALANCE_FILTER_ALL },
  ...BALANCE_POINT_TYPE_OPTIONS.map((type) => ({
    label: BALANCE_POINT_TYPE_LABEL[type],
    value: String(type),
  })),
];

export default function BalanceGoldPanel({
  page,
  type,
  onPageChange,
  onTypeChange,
}: TBalanceLogPanelProps) {
  const { data, isPending, isError, refetch } = useGetMyPointPagination({
    page,
    per_page: BALANCE_PAGE_SIZE,
    sort_by: "created_at",
    order: OrderKeyEnum.DESC,
    type: (type ?? undefined) as UserPointLogTypeEnum | undefined,
  });

  const items: TBalanceLogItem[] = useMemo(
    () =>
      (data?.data?.data?.items ?? []).map((log) => ({
        id: log.id,
        createdAt: log.created_at,
        typeLabel: BALANCE_POINT_TYPE_LABEL[log.type] ?? "Gold",
        description: log.description,
        amount: getSignedPointAmount(log.amount, log.type),
        unit: "GP",
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
      typeAriaLabel="Gold type"
      emptyTitle="No gold yet"
      emptyDescription="Gold you earn or spend will be recorded here."
      onTypeChange={(value) => onTypeChange(toTypeOrNull(value))}
      onRetry={() => refetch()}
      onReset={() => onTypeChange(null)}
      onPageChange={onPageChange}
    />
  );
}
