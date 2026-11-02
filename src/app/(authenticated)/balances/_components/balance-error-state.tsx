import { TriangleAlert } from "lucide-react";

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
import type { TBalanceErrorStateProps } from "@/app/(authenticated)/balances/_types/balance-components-props";

export default function BalanceErrorState({
  onRetry,
}: TBalanceErrorStateProps) {
  const { t } = useT(BALANCES_MESSAGES);

  return (
    <Empty role="alert" className="border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="text-destructive">
          <TriangleAlert />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">
          {t("error.title")}
        </EmptyTitle>
        <EmptyDescription>{t("error.description")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRetry}>
          {t("error.retry")}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
