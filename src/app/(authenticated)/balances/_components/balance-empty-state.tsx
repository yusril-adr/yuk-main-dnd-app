import { ScrollText } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import { useT } from "@/app/_hooks/use-t";

import { BALANCES_MESSAGES } from "@/app/(authenticated)/balances/_messages";
import type { TBalanceEmptyStateProps } from "@/app/(authenticated)/balances/_types/balance-components-props";

export default function BalanceEmptyState({
  title,
  description,
  isFiltered,
  onReset,
}: TBalanceEmptyStateProps) {
  const { t } = useT(BALANCES_MESSAGES);

  return (
    <Empty className="border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ScrollText />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">
          {isFiltered ? t("empty.filteredTitle") : title}
        </EmptyTitle>
        <EmptyDescription>
          {isFiltered ? t("empty.filteredDescription") : description}
        </EmptyDescription>
      </EmptyHeader>
      {isFiltered && (
        <EmptyContent>
          <Button variant="outline" onClick={onReset}>
            {t("empty.clearFilter")}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
