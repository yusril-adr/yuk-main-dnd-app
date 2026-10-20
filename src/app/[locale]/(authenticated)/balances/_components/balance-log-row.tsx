import dayjs from "@/libs/dayjs";
import { Badge } from "@/app/_components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/app/_components/ui/item";

import BalanceAmountDialog from "@/app/[locale]/(authenticated)/balances/_components/balance-amount-dialog";
import { BALANCE_DATE_FORMAT } from "@/app/[locale]/(authenticated)/balances/_constants/balance";
import type { TBalanceLogRowProps } from "@/app/[locale]/(authenticated)/balances/_types/balance-components-props";

export default function BalanceLogRow({ item }: TBalanceLogRowProps) {
  const isLoss = item.amount < 0;

  return (
    <Item role="listitem" className="items-start md:items-center">
      <ItemContent className="min-w-0">
        <ItemTitle className="flex-wrap">
          <Badge variant="secondary">{item.typeLabel}</Badge>
          <time
            dateTime={item.createdAt}
            className="text-xs font-normal text-muted-foreground"
          >
            {dayjs(item.createdAt).format(BALANCE_DATE_FORMAT)}
          </time>
        </ItemTitle>
        <ItemDescription className="line-clamp-2 md:line-clamp-1">
          {item.description || "—"}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="font-heading text-base tabular-nums">
        <BalanceAmountDialog
          value={item.amount}
          unit={item.unit}
          label={item.typeLabel}
          isSigned
          className={
            isLoss
              ? "text-destructive"
              : "text-emerald-700 dark:text-emerald-400"
          }
        />
        <ItemDescription className="text-xs">{item.unit}</ItemDescription>
      </ItemActions>
    </Item>
  );
}
