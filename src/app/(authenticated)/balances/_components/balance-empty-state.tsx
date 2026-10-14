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

import type { TBalanceEmptyStateProps } from "@/app/(authenticated)/balances/_types/balance-components-props";

export default function BalanceEmptyState({
  title,
  description,
  isFiltered,
  onReset,
}: TBalanceEmptyStateProps) {
  return (
    <Empty className="border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ScrollText />
        </EmptyMedia>
        <EmptyTitle className="font-heading text-xl">
          {isFiltered ? "No entries match" : title}
        </EmptyTitle>
        <EmptyDescription>
          {isFiltered ? "Try another type filter." : description}
        </EmptyDescription>
      </EmptyHeader>
      {isFiltered && (
        <EmptyContent>
          <Button variant="outline" onClick={onReset}>
            Clear filter
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
