"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import {
  Funnel,
  ScrollText,
  Search,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/app/_components/ui/item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Skeleton } from "@/app/_components/ui/skeleton";
import dayjs from "@/libs/dayjs";
import { generatePages } from "@/utils/table-helper";

import type { TUserBalanceLogListProps } from "../_types/user-balance-log-list-props";

const DISABLED = "pointer-events-none opacity-50";

export default function UserBalanceLogList<TType extends number>({
  data,
  isLoading,
  isError,
  unit,
  onRetry,
  pageCount,
  rowCount,
  queryTable,
  typeOptions,
  typeLabels,
  typeIcons,
  directionOptions,
  directionLabels,
  isExpense,
  onPageChange,
  onSearchChange,
  onFilterApply,
}: TUserBalanceLogListProps<TType>) {
  const [draftType, setDraftType] = useState<TType | null>(
    queryTable.type as TType | null,
  );
  const [draftDirection, setDraftDirection] = useState<number | null>(
    queryTable.direction,
  );

  const pages = useMemo(
    () =>
      generatePages({
        currentPage: queryTable.page,
        totalPages: pageCount,
      }),
    [queryTable.page, pageCount],
  );

  const isFirstPage = queryTable.page === 1;
  const isLastPage = queryTable.page >= pageCount;
  const activeFilterCount =
    Number(queryTable.type != null) + Number(queryTable.direction != null);
  const isFiltered = !!queryTable.search || activeFilterCount > 0;

  const go = (target: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (target >= 1 && target <= pageCount && target !== queryTable.page)
      onPageChange(target);
  };

  const onFilterSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      onFilterApply({
        type: draftType,
        direction: draftDirection,
      });
    },
    [draftType, draftDirection, onFilterApply],
  );

  const onFilterClear = useCallback(() => {
    setDraftType(null);
    setDraftDirection(null);
    onFilterApply({ type: null, direction: null });
  }, [onFilterApply]);

  const onSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
        <Popover>
          <PopoverTrigger
            render={<Button variant="outline" className="h-10 self-start" />}
          >
            <Funnel />
            Filter
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ms-1">
                {activeFilterCount}
              </Badge>
            )}
          </PopoverTrigger>
          <PopoverContent align="start">
            <form
              className="flex flex-col gap-4 md:gap-2"
              onSubmit={onFilterSubmit}
            >
              <FieldGroup>
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="type">Type</FieldLabel>
                  <Combobox
                    id="type"
                    items={typeOptions}
                    value={draftType}
                    itemToStringLabel={(item) => typeLabels[item]}
                    onValueChange={(value) => setDraftType(value || null)}
                  >
                    <ComboboxInput placeholder="Select type" showClear />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {typeLabels[item as TType]}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
                {directionOptions && directionLabels && (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="direction">Direction</FieldLabel>
                    <Combobox
                      id="direction"
                      items={directionOptions}
                      value={draftDirection}
                      itemToStringLabel={(item) => directionLabels[item]}
                      onValueChange={(value) => setDraftDirection(value || null)}
                    >
                      <ComboboxInput placeholder="Select direction" showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {directionLabels[item as number]}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                )}
              </FieldGroup>
              <FieldGroup className="mt-2">
                <Field orientation="horizontal">
                  <Button
                    className="ms-auto"
                    variant="outline"
                    type="reset"
                    onClick={onFilterClear}
                  >
                    Clear
                  </Button>
                  <Button type="submit">Apply</Button>
                </Field>
              </FieldGroup>
            </form>
          </PopoverContent>
        </Popover>
        <InputGroup className="h-10 bg-card sm:flex-1">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search descriptions"
            placeholder="Search descriptions (min. 3 characters)…"
            onChange={onSearchInputChange}
            defaultValue={queryTable.search}
          />
        </InputGroup>
      </div>

      {!isLoading && isError ? (
        <Empty role="alert" className="border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TriangleAlert className="text-destructive" />
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
      ) : !isLoading && data.length === 0 ? (
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ScrollText />
            </EmptyMedia>
            <EmptyTitle className="font-heading text-xl">
              {isFiltered ? "No entries match" : "No entries yet"}
            </EmptyTitle>
            <EmptyDescription>
              {isFiltered
                ? "Try another search or clear the filter."
                : "No balance has been recorded for this user yet."}
            </EmptyDescription>
          </EmptyHeader>
          {activeFilterCount > 0 && (
            <EmptyContent>
              <Button variant="outline" onClick={onFilterClear}>
                Clear filter
              </Button>
            </EmptyContent>
          )}
        </Empty>
      ) : (
        <Card size="sm" className="py-0">
          <ItemGroup className="gap-0">
            {isLoading
              ? Array.from({ length: queryTable.pageSize }).map((_, index) => (
                  <Fragment key={index}>
                    {index > 0 && <ItemSeparator className="my-0" />}
                    <Item role="listitem">
                      <ItemContent>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </ItemContent>
                      <ItemActions>
                        <Skeleton className="h-5 w-16" />
                      </ItemActions>
                    </Item>
                  </Fragment>
                ))
              : data.map((row, index) => {
                  const TypeIcon: LucideIcon | undefined =
                    typeIcons[row.type as TType];
                  const expense = isExpense?.(row) ?? false;
                  return (
                    <Fragment key={row.id}>
                      {index > 0 && <ItemSeparator className="my-0" />}
                      <Item
                        role="listitem"
                        className="items-start sm:items-center"
                      >
                        <ItemContent className="min-w-0">
                          <ItemTitle className="flex-wrap">
                            <Badge
                              variant="secondary"
                              className="gap-1 [&>svg]:size-3"
                            >
                              {TypeIcon && <TypeIcon aria-hidden />}
                              {typeLabels[row.type as TType] ??
                                String(row.type)}
                            </Badge>
                            <time
                              dateTime={row.created_at}
                              className="text-xs font-normal text-muted-foreground"
                            >
                              {dayjs(row.created_at).format(
                                "YYYY-MM-DD HH:mm:ss",
                              )}
                            </time>
                          </ItemTitle>
                          <ItemDescription className="line-clamp-2">
                            {row.description || "—"}
                          </ItemDescription>
                        </ItemContent>
                        <ItemActions className="font-heading text-base tabular-nums">
                          <span
                            className={
                              expense
                                ? "text-destructive"
                                : "text-emerald-700 dark:text-emerald-400"
                            }
                          >
                            {expense ? "−" : "+"}
                            {row.amount.toLocaleString()}
                          </span>
                          <ItemDescription className="text-xs">
                            {unit}
                          </ItemDescription>
                        </ItemActions>
                      </Item>
                    </Fragment>
                  );
                })}
          </ItemGroup>
        </Card>
      )}

      {!isLoading && !isError && rowCount > 0 && (
        <Card size="sm" className="items-center px-3 sm:px-4">
          <Pagination aria-label="Ledger pages" className="mx-0 w-auto">
            <PaginationContent className="flex-wrap justify-center">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text=""
                  aria-label="Previous page"
                  aria-disabled={isFirstPage}
                  className={isFirstPage ? DISABLED : undefined}
                  onClick={go(queryTable.page - 1)}
                />
              </PaginationItem>
              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    size="icon-sm"
                    isActive={page === queryTable.page}
                    onClick={go(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text=""
                  aria-label="Next page"
                  aria-disabled={isLastPage}
                  className={isLastPage ? DISABLED : undefined}
                  onClick={go(queryTable.page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      )}
    </div>
  );
}
