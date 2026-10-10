import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Funnel, Search } from "lucide-react";
import type { SortingState } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Else, If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  DataTable,
  DataTableSortableColHeader,
} from "@/app/_components/data-table";
import { OrderKeyEnum } from "@/common/enums/order-key";
import dayjs from "@/libs/dayjs";
import type { TUserBalanceLogSortBy } from "../_types/user-balance-log-sort-by";
import type {
  TUserBalanceLogRow,
  TUserBalanceLogTableProps,
} from "../_types/user-balance-log-table-props";

export default function UserBalanceLogTable<TType extends number>({
  data,
  isLoading,
  pageCount,
  rowCount,
  queryTable,
  typeOptions,
  typeLabels,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
  onSearchChange,
  onFilterApply,
}: TUserBalanceLogTableProps<TType>) {
  const [draftType, setDraftType] = useState<TType | null>(
    queryTable.type as TType | null,
  );

  const onTypeChange = useCallback((value: TType | null) => {
    setDraftType(value || null);
  }, []);

  const onFilterSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      onFilterApply(draftType);
    },
    [draftType, onFilterApply],
  );

  const onFilterClear = useCallback(() => {
    setDraftType(null);
    onFilterApply(null);
  }, [onFilterApply]);

  const onSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange],
  );

  const onSortClick = useCallback(
    (key: TUserBalanceLogSortBy) => {
      onSortingChange(key);
    },
    [onSortingChange],
  );

  const columnHelper = createColumnHelper<TUserBalanceLogRow>();
  const columns = [
    columnHelper.display({
      id: "no",
      header: "No.",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const startIndex = (pageIndex - 1) * pageSize;
        return `${startIndex + row.index + 1}.`;
      },
    }),
    columnHelper.accessor("amount", {
      header: () => (
        <DataTableSortableColHeader
          label="Amount"
          sortKey="amount"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onSortClick("amount")}
        />
      ),
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("type", {
      header: () => (
        <DataTableSortableColHeader
          label="Type"
          sortKey="type"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onSortClick("type")}
        />
      ),
      cell: (info) => (
        <Badge variant="secondary">
          {typeLabels[info.getValue() as TType] ?? String(info.getValue())}
        </Badge>
      ),
    }),
    columnHelper.accessor("description", {
      header: () => (
        <DataTableSortableColHeader
          label="Description"
          sortKey="description"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onSortClick("description")}
        />
      ),
      cell: (info) => {
        const description = info.getValue();
        return (
          <If condition={description != null && description !== ""}>
            <Then>{description}</Then>
            <Else>
              <span className="text-muted-foreground">-</span>
            </Else>
          </If>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      header: () => (
        <DataTableSortableColHeader
          label="Created At"
          sortKey="created_at"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onSortClick("created_at")}
        />
      ),
      cell: (info) => dayjs(info.getValue()).format("YYYY-MM-DD HH:mm:ss"),
    }),
    columnHelper.accessor("updated_at", {
      header: () => (
        <DataTableSortableColHeader
          label="Updated At"
          sortKey="updated_at"
          sortBy={queryTable.sortBy}
          order={queryTable.order}
          onClick={() => onSortClick("updated_at")}
        />
      ),
      cell: (info) => dayjs(info.getValue()).format("YYYY-MM-DD HH:mm:ss"),
    }),
  ];

  const sorting = useMemo<SortingState>(() => {
    if (!queryTable.sortBy) return [];
    return [
      {
        id: queryTable.sortBy,
        desc: queryTable.order === OrderKeyEnum.DESC,
      },
    ];
  }, [queryTable.order, queryTable.sortBy]);

  const columnFilters =
    queryTable.type != null ? [{ id: "type", value: queryTable.type }] : [];

  return (
    <DataTable
      data={data}
      isLoading={isLoading}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      tableOptions={{
        columns,
        pageCount,
        rowCount,
        state: {
          pagination: {
            pageIndex: queryTable.page,
            pageSize: queryTable.pageSize,
          },
          sorting,
          columnFilters,
        },
      }}
    >
      <div className="flex items-center justify-between gap-2">
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
                    onValueChange={onTypeChange}
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
    </DataTable>
  );
}
