import { useMemo } from "react";

import { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { useT } from "@/app/_hooks/use-t";

import BalanceLogList from "@/app/(authenticated)/balances/_components/balance-log-list";
import { useGetMyPointPagination } from "@/app/(authenticated)/balances/_hooks/use-get-my-point-pagination";
import {
  BALANCE_POINT_TYPE_OPTIONS,
  BALANCE_FILTER_ALL,
  BALANCE_PAGE_SIZE,
} from "@/app/(authenticated)/balances/_constants/balance";
import { BALANCES_MESSAGES } from "@/app/(authenticated)/balances/_messages";
import {
  getSignedPointAmount,
  toTypeOrNull,
} from "@/app/(authenticated)/balances/_utils/balance-helper";
import type {
  TBalanceLogItem,
  TBalanceLogPanelProps,
} from "@/app/(authenticated)/balances/_types/balance-components-props";

const POINT_TYPE_LABEL_KEY = {
  [UserPointLogTypeEnum.INCOME]: "enums.pointType.income",
  [UserPointLogTypeEnum.EXPENSE]: "enums.pointType.expense",
} as const;

export default function BalanceGoldPanel({
  page,
  type,
  onPageChange,
  onTypeChange,
}: TBalanceLogPanelProps) {
  const { t } = useT(BALANCES_MESSAGES);
  const { data, isPending, isError, refetch } = useGetMyPointPagination({
    page,
    per_page: BALANCE_PAGE_SIZE,
    sort_by: "created_at",
    order: OrderKeyEnum.DESC,
    type: (type ?? undefined) as UserPointLogTypeEnum | undefined,
  });

  const typeItems = useMemo(
    () => [
      { label: t("filters.allGold"), value: BALANCE_FILTER_ALL },
      ...BALANCE_POINT_TYPE_OPTIONS.map((option) => ({
        label: t(POINT_TYPE_LABEL_KEY[option]),
        value: String(option),
      })),
    ],
    [t],
  );

  const items: TBalanceLogItem[] = useMemo(
    () =>
      (data?.data?.data?.items ?? []).map((log) => ({
        id: log.id,
        createdAt: log.created_at,
        typeLabel:
          POINT_TYPE_LABEL_KEY[log.type] != null
            ? t(POINT_TYPE_LABEL_KEY[log.type])
            : t("enums.pointType.fallback"),
        description: log.description,
        amount: getSignedPointAmount(log.amount, log.type),
        unit: t("units.gp"),
      })),
    [data, t],
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
      typeItems={typeItems}
      typeValue={type != null ? String(type) : BALANCE_FILTER_ALL}
      typeAriaLabel={t("filters.goldTypeAria")}
      emptyTitle={t("empty.goldTitle")}
      emptyDescription={t("empty.goldDescription")}
      onTypeChange={(value) => onTypeChange(toTypeOrNull(value))}
      onRetry={() => refetch()}
      onReset={() => onTypeChange(null)}
      onPageChange={onPageChange}
    />
  );
}
