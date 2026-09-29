"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Funnel, Search } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { ButtonGroup } from "@/app/_components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
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
import { OrderKeyEnum } from "@/common/enums/order-key";
import { generatePages } from "@/utils/table-helper";

import UserCard from "./user-card";
import UserCardSkeleton from "./user-card-skeleton";
import type { TUserCardListProps } from "@/app/(authenticated)/dashboard/master/iam/users/_types/user-card-list-props";
import type { TUserCardListSortBy } from "@/app/(authenticated)/dashboard/master/iam/users/_types/user-card-list-sort-by";

let debounceSearchTimeoutId: NodeJS.Timeout | number | null = null;
let debounceRoleSearchTimeoutId: NodeJS.Timeout | number | null = null;

const PAGE_SIZE_OPTIONS = [
  { label: "6 / page", value: 6 },
  { label: "12 / page", value: 12 },
  { label: "24 / page", value: 24 },
  { label: "48 / page", value: 48 },
];

const SORT_BY_OPTIONS = [
  { label: "Display Name", value: "display_name" },
  { label: "Username", value: "username" },
  { label: "Email", value: "email" },
  { label: "DM Level", value: "dm_level" },
  { label: "Player Level", value: "player_level" },
  { label: "DM XP", value: "dm_exp" },
  { label: "Player XP", value: "player_exp" },
  { label: "Created At", value: "created_at" },
  { label: "Updated At", value: "updated_at" },
];

const SORT_ORDER_OPTIONS = [
  { label: "Ascending", value: OrderKeyEnum.ASC },
  { label: "Descending", value: OrderKeyEnum.DESC },
];

export default function UserCardList({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  roleItems,
  onRoleSearchChange,
  onActionHandler,
}: TUserCardListProps) {
  const [filterSortBy, setFilterSortBy] = useState<TUserCardListSortBy | null>(
    queryTable.sortBy ?? null,
  );
  const [filterOrder, setFilterOrder] = useState<OrderKeyEnum | null>(
    queryTable.order ?? null,
  );
  const [filterRoleIds, setFilterRoleIds] = useState<string[]>(
    queryTable.roleIds ?? [],
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

  const onSearchChange = useCallback(
    (value: string) => {
      if (value && value.length < 3) {
        return;
      }

      if (debounceSearchTimeoutId) {
        clearTimeout(debounceSearchTimeoutId);
      }

      debounceSearchTimeoutId = setTimeout(() => {
        onActionHandler.onSearchChange(value);
      }, 300);
    },
    [onActionHandler],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      onActionHandler.onPageChange(page);
    },
    [onActionHandler],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      onActionHandler.onPageSizeChange(pageSize);
    },
    [onActionHandler],
  );

  const onFilterApply = useCallback(() => {
    onActionHandler.onFilterApply({
      sortBy: filterSortBy,
      order: filterOrder,
      roleIds: filterRoleIds,
    });
  }, [filterSortBy, filterOrder, filterRoleIds, onActionHandler]);

  const onFilterClear = useCallback(() => {
    setFilterSortBy("updated_at");
    setFilterOrder(OrderKeyEnum.DESC);
    setFilterRoleIds([]);
    onRoleSearchChange("");
    onActionHandler.onFilterApply({
      sortBy: null,
      order: null,
      roleIds: [],
    });
  }, [onRoleSearchChange, onActionHandler]);

  const handleRoleSearchChange = useCallback(
    (value: string) => {
      if (debounceRoleSearchTimeoutId) {
        clearTimeout(debounceRoleSearchTimeoutId);
      }
      debounceRoleSearchTimeoutId = setTimeout(() => {
        onRoleSearchChange(value);
      }, 300);
    },
    [onRoleSearchChange],
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
            <div className="flex flex-col gap-4 md:gap-2">
              <FieldGroup className="flex flex-col md:flex-row gap-4 md:gap-2">
                <Field className="grid gap-2">
                  <FieldLabel>Sort By</FieldLabel>
                  <Select
                    items={SORT_BY_OPTIONS}
                    value={filterSortBy ?? undefined}
                    onValueChange={(val) => setFilterSortBy(val || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SORT_BY_OPTIONS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field className="grid gap-2">
                  <FieldLabel>Sort Order</FieldLabel>
                  <Select
                    items={SORT_ORDER_OPTIONS}
                    value={filterOrder ?? undefined}
                    onValueChange={(val) => setFilterOrder(val || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SORT_ORDER_OPTIONS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field className="grid gap-2">
                  <FieldLabel>Roles</FieldLabel>
                  <Combobox
                    multiple
                    items={roleItems}
                    value={filterRoleIds.map(
                      (id) =>
                        roleItems.find((r) => r.value === id) ?? {
                          value: id,
                          label: id,
                        },
                    )}
                    onValueChange={(value) => {
                      setFilterRoleIds(value.map((v) => v.value));
                    }}
                    onInputValueChange={(inputValue) =>
                      handleRoleSearchChange(inputValue)
                    }
                  >
                    <ComboboxChips>
                      {filterRoleIds.map((id) => {
                        const role = roleItems.find((r) => r.value === id);
                        return (
                          <ComboboxChip key={id}>
                            {role?.label ?? id}
                          </ComboboxChip>
                        );
                      })}
                      <ComboboxChipsInput placeholder="Search roles" />
                    </ComboboxChips>
                    <ComboboxContent>
                      <ComboboxEmpty>No roles found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item: { value: string; label: string }) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
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
                    onClick={onFilterClear}
                  >
                    Clear
                  </Button>
                  <Button onClick={onFilterApply}>Apply</Button>
                </Field>
              </FieldGroup>
            </div>
          </PopoverContent>
        </Popover>

        <InputGroup>
          <InputGroupInput
            placeholder="Type minimum 3 characters to search ..."
            onChange={(event) => onSearchChange(event.target.value)}
            defaultValue={queryTable.search}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading &&
          Array.from({ length: queryTable.pageSize }).map((_, idx) => (
            <UserCardSkeleton key={idx} />
          ))}

        {!isLoading &&
          data.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={onActionHandler.onDeleteUser}
            />
          ))}
      </div>

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
              onClick={() => handlePageChange(queryTable.page - 1)}
            >
              <ChevronLeft />
            </Button>

            {pages.map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="icon"
                disabled={page === queryTable.page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              disabled={isLastPage}
              onClick={() => handlePageChange(queryTable.page + 1)}
            >
              <ChevronRight />
            </Button>
          </ButtonGroup>

          <Select
            items={PAGE_SIZE_OPTIONS}
            value={Number(queryTable.pageSize)}
            onValueChange={(val) =>
              handlePageSizeChange(val || queryTable.pageSize)
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
