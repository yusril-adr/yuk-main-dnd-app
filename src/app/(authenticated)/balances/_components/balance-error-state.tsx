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

import type { TBalanceErrorStateProps } from "@/app/(authenticated)/balances/_types/balance-components-props";

export default function BalanceErrorState({
  onRetry,
}: TBalanceErrorStateProps) {
  return (
    <Empty role="alert" className="border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="text-destructive">
          <TriangleAlert />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">
          Could not load the ledger
        </EmptyTitle>
        <EmptyDescription>
          Something went wrong on the way. Please try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  );
}
