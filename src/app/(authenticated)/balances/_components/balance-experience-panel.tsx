import { useMemo } from "react";

import { UserExpLogDirectionEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-direction";
import { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import { OrderKeyEnum } from "@/common/enums/order-key";
import { useT } from "@/app/_hooks/use-t";

import BalanceLogList from "@/app/(authenticated)/balances/_components/balance-log-list";
import { useGetMyExperiencePointPagination } from "@/app/(authenticated)/balances/_hooks/use-get-my-experience-point-pagination";
import {
  BALANCE_EXP_DIRECTION_OPTIONS,
  BALANCE_EXP_TYPE_OPTIONS,
  BALANCE_FILTER_ALL,
  BALANCE_PAGE_SIZE,
} from "@/app/(authenticated)/balances/_constants/balance";
import { BALANCES_MESSAGES } from "@/app/(authenticated)/balances/_messages";
import {
  getSignedExpAmount,
  toTypeOrNull,
} from "@/app/(authenticated)/balances/_utils/balance-helper";
import type {
  TBalanceLogItem,
  TBalanceLogPanelProps,
} from "@/app/(authenticated)/balances/_types/balance-components-props";

const EXP_TYPE_LABEL_KEY = {
  [UserExpLogTypeEnum.PLAYER]: "enums.expType.player",
  [UserExpLogTypeEnum.DM]: "enums.expType.dm",
} as const;

const EXP_DIRECTION_LABEL_KEY = {
  [UserExpLogDirectionEnum.INCREMENT]: "enums.expDirection.increment",
  [UserExpLogDirectionEnum.DECREMENT]: "enums.expDirection.decrement",
} as const;

export default function BalanceExperiencePanel({
  page,
  type,
  direction,
  onPageChange,
  onTypeChange,
  onDirectionChange,
  onFilterReset,
}: TBalanceLogPanelProps) {
  const { t } = useT(BALANCES_MESSAGES);
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

  const typeItems = useMemo(
    () => [
      { label: t("filters.allExperience"), value: BALANCE_FILTER_ALL },
      ...BALANCE_EXP_TYPE_OPTIONS.map((option) => ({
        label: t(EXP_TYPE_LABEL_KEY[option]),
        value: String(option),
      })),
    ],
    [t],
  );

  const directionItems = useMemo(
    () => [
      { label: t("filters.allChanges"), value: BALANCE_FILTER_ALL },
      ...BALANCE_EXP_DIRECTION_OPTIONS.map((option) => ({
        label: t(EXP_DIRECTION_LABEL_KEY[option]),
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
          EXP_TYPE_LABEL_KEY[log.type] != null
            ? t(EXP_TYPE_LABEL_KEY[log.type])
            : t("enums.expType.fallback"),
        description: log.description,
        amount: getSignedExpAmount(log.amount, log.direction),
        unit: t("units.exp"),
      })),
    [data, t],
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
      typeItems={typeItems}
      typeValue={type != null ? String(type) : BALANCE_FILTER_ALL}
      typeAriaLabel={t("filters.expTypeAria")}
      directionItems={directionItems}
      directionValue={
        direction != null ? String(direction) : BALANCE_FILTER_ALL
      }
      directionAriaLabel={t("filters.expDirectionAria")}
      onDirectionChange={(value) => onDirectionChange(toTypeOrNull(value))}
      emptyTitle={t("empty.expTitle")}
      emptyDescription={t("empty.expDescription")}
      onTypeChange={(value) => onTypeChange(toTypeOrNull(value))}
      onRetry={() => refetch()}
      onReset={onFilterReset}
      onPageChange={onPageChange}
    />
  );
}
