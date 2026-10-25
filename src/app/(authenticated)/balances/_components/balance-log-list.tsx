import { Fragment } from "react";

import { Card } from "@/app/_components/ui/card";
import { ItemGroup, ItemSeparator } from "@/app/_components/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

import BalanceLogRow from "@/app/(authenticated)/balances/_components/balance-log-row";
import BalanceLogSkeleton from "@/app/(authenticated)/balances/_components/balance-log-skeleton";
import BalanceEmptyState from "@/app/(authenticated)/balances/_components/balance-empty-state";
import BalanceErrorState from "@/app/(authenticated)/balances/_components/balance-error-state";
import BalancePagination from "@/app/(authenticated)/balances/_components/balance-pagination";
import type { TBalanceLogListProps } from "@/app/(authenticated)/balances/_types/balance-components-props";

export default function BalanceLogList({
  data,
  isLoading,
  isError,
  isFiltered,
  page,
  pageCount,
  rowCount,
  typeItems,
  typeValue,
  typeAriaLabel,
  directionItems,
  directionValue,
  directionAriaLabel,
  onDirectionChange,
  emptyTitle,
  emptyDescription,
  onTypeChange,
  onRetry,
  onReset,
  onPageChange,
}: TBalanceLogListProps) {
  let content: React.ReactNode;
  if (isLoading) content = <BalanceLogSkeleton />;
  else if (isError) content = <BalanceErrorState onRetry={onRetry} />;
  else if (data.length === 0)
    content = (
      <BalanceEmptyState
        title={emptyTitle}
        description={emptyDescription}
        isFiltered={isFiltered}
        onReset={onReset}
      />
    );
  else
    content = (
      <Card size="sm" className="py-0">
        <ItemGroup className="gap-0">
          {data.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 && <ItemSeparator className="my-0" />}
              <BalanceLogRow item={item} />
            </Fragment>
          ))}
        </ItemGroup>
      </Card>
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Select
          items={typeItems}
          value={typeValue}
          onValueChange={(value) => onTypeChange(value as string)}
        >
          <SelectTrigger
            aria-label={typeAriaLabel}
            className="h-10! w-full bg-card sm:w-52"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {typeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {directionItems && onDirectionChange && (
          <Select
            items={directionItems}
            value={directionValue}
            onValueChange={(value) => onDirectionChange(value as string)}
          >
            <SelectTrigger
              aria-label={directionAriaLabel}
              className="h-10! w-full bg-card sm:w-52"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {directionItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {content}

      {!isLoading && !isError && (
        <BalancePagination
          page={page}
          pageCount={pageCount}
          rowCount={rowCount}
          itemCount={data.length}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
