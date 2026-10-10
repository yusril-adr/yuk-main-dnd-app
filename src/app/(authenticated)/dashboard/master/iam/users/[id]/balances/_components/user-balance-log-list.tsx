"use client";

import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Funnel,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Else, If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { ButtonGroup } from "@/app/_components/ui/button-group";
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
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Skeleton } from "@/app/_components/ui/skeleton";
import dayjs from "@/libs/dayjs";
import { generatePages } from "@/utils/table-helper";

import type { TUserBalanceLogListProps } from "../_types/user-balance-log-list-props";

const PAGE_SIZE_OPTIONS = [
  { label: "5 / page", value: 5 },
  { label: "10 / page", value: 10 },
  { label: "20 / page", value: 20 },
  { label: "50 / page", value: 50 },
  { label: "100 / page", value: 100 },
];

export default function UserBalanceLogList<TType extends number>({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  typeOptions,
  typeLabels,
  typeIcons,
  isExpense,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onFilterApply,
}: TUserBalanceLogListProps<TType>) {
  const [draftType, setDraftType] = useState<TType | null>(
    queryTable.type as TType | null,
  );

  const pages = useMemo(
    () =>
      generatePages({
        currentPage: queryTable.page,
        totalPages: pageCount,
      }),
    [queryTable.page, pageCount],
  );

  const dataStartIndex = (queryTable.page - 1) * queryTable.pageSize;
  const indexStart = rowCount === 0 ? 0 : dataStartIndex + 1;
  const indexEnd = Math.min(dataStartIndex + data.length, rowCount);
  const isFirstPage = queryTable.page === 1;
  const isLastPage = queryTable.page === pageCount;

  const onFilterSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      onFilterApply({
        type: draftType,
      });
    },
    [draftType, onFilterApply],
  );

  const onFilterClear = useCallback(() => {
    setDraftType(null);
    onFilterApply({ type: null });
  }, [onFilterApply]);

  const onSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange],
  );

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-6">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            <Funnel />
            Filter
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
        <InputGroup>
          <InputGroupInput
            placeholder="Type minimum 3 characters to search ..."
            onChange={onSearchInputChange}
            defaultValue={queryTable.search}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <ItemGroup>
        {isLoading &&
          Array.from({ length: queryTable.pageSize }).map((_, index) => (
            <Item key={index} variant="outline" size="sm">
              <Skeleton className="size-8 rounded-md" />
              <ItemContent>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-36" />
              </ItemContent>
            </Item>
          ))}

        {!isLoading &&
          data.map((row) => {
            const TypeIcon: LucideIcon | undefined =
              typeIcons[row.type as TType];
            const expense = isExpense?.(row.type as TType) ?? false;
            return (
              <Item key={row.id} variant="outline" size="sm">
                {TypeIcon ? (
                  <ItemMedia variant="icon">
                    <TypeIcon className="size-4" />
                  </ItemMedia>
                ) : null}
                <ItemContent>
                  <ItemTitle>
                    <span className={expense ? "text-destructive" : undefined}>
                      {expense ? "(-) " : "+ "}
                      {row.amount.toLocaleString()}
                    </span>
                  </ItemTitle>
                  <Badge
                    variant={expense ? "destructive" : "secondary"}
                    className={expense ? "self-start text-white" : "self-start"}
                  >
                    {typeLabels[row.type as TType] ?? String(row.type)}
                  </Badge>
                  <ItemDescription>
                    <If
                      condition={
                        row.description != null && row.description !== ""
                      }
                    >
                      <Then>{row.description}</Then>
                      <Else>
                        <span className="text-muted-foreground">-</span>
                      </Else>
                    </If>
                  </ItemDescription>
                  <ItemDescription>
                    {dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </ItemDescription>
                </ItemContent>
              </Item>
            );
          })}
      </ItemGroup>

      {!isLoading && (
        <div className="flex flex-col md:flex-row justify-end items-center gap-2 mt-6">
          <span>
            {indexStart} - {indexEnd} of {rowCount} items
          </span>

          <ButtonGroup>
            <Button
              variant="ghost"
              size="icon"
              disabled={isFirstPage}
              onClick={() => onPageChange(queryTable.page - 1)}
            >
              <ChevronLeft />
            </Button>

            {pages.map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="icon"
                disabled={page === queryTable.page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              disabled={isLastPage}
              onClick={() => onPageChange(queryTable.page + 1)}
            >
              <ChevronRight />
            </Button>
          </ButtonGroup>

          <Select
            items={PAGE_SIZE_OPTIONS}
            value={Number(queryTable.pageSize)}
            onValueChange={(val) =>
              onPageSizeChange(val || queryTable.pageSize)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PAGE_SIZE_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value.toString()}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
