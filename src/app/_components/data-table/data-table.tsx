import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/app/_components/ui/table";
import { Button } from "@/app/_components/ui/button";
import { ButtonGroup } from "@/app/_components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { generatePages } from "@/utils/table-helper";
import { useT } from "@/app/_hooks/use-t";
import { DATA_TABLE_MESSAGES } from "@/app/_messages/data-table";
import type { TDataTableProps } from "@/app/_types/data-table-props";

const PAGE_SIZES = [5, 10, 20, 50, 100];

export function DataTable<TData>({
  data,
  isLoading = false,
  onPageChange,
  onPageSizeChange,
  children,
  tableOptions,
}: TDataTableProps<TData>) {
  const { t } = useT(DATA_TABLE_MESSAGES);
  const pageSizeOptions = PAGE_SIZES.map((value) => ({
    label: t("perPage", { count: value }),
    value,
  }));
  const {
    state: tableOptionsState,
    columns = [],
    rowCount = 0,
    ...restTableOptions
  } = tableOptions ?? {};
  const totalRowInCurrentPage = data.length;

  const pagination = tableOptionsState?.pagination;
  const pageIndex = pagination?.pageIndex ?? 1;
  const pageSize = pagination?.pageSize ?? 10;
  const tablePageCount = restTableOptions.pageCount ?? 1;

  const dataStartIndex = useMemo(
    () => (pageIndex - 1) * pageSize || 0,
    [pageIndex, pageSize],
  );

  const tableState = useMemo(
    () => tableOptionsState ?? {},
    [tableOptionsState],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: tableState,
    ...restTableOptions,
  });

  const pages = generatePages({
    currentPage: pageIndex,
    totalPages: tablePageCount,
  });

  const indexStart = rowCount === 0 ? 0 : dataStartIndex + 1;
  const indexEnd = Math.min(dataStartIndex + totalRowInCurrentPage, rowCount);
  const isFirstPage = pageIndex === 1;
  const isLastPage = pageIndex === tablePageCount;

  const columnCount =
    table.getHeaderGroups().at(0)?.headers.length ?? columns.length;

  return (
    <div className="flex flex-col gap-4">
      {children}

      <div className="flex flex-col">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {!isLoading &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {isLoading &&
              Array.from({ length: pageSize || 10 }).map((_, idx) => (
                <TableRow key={idx}>
                  {Array.from({ length: columnCount }).map((_, cellIdx) => (
                    <TableCell key={cellIdx}>
                      <Skeleton className="h-7" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {!isLoading && (
          <div className="flex flex-col md:flex-row justify-end items-center gap-2">
            <span>
              {t("range", {
                start: indexStart,
                end: indexEnd,
                total: rowCount,
              })}
            </span>

            <ButtonGroup>
              <Button
                variant="ghost"
                size="icon"
                disabled={isFirstPage}
                onClick={() => onPageChange?.(pageIndex - 1)}
              >
                <ChevronLeft />
              </Button>

              {pages.map((page) => (
                <Button
                  key={page}
                  variant="ghost"
                  size="icon"
                  disabled={page === pageIndex}
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="icon"
                disabled={isLastPage}
                onClick={() => onPageChange?.(pageIndex + 1)}
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>

            <Select
              items={pageSizeOptions}
              value={Number(pageSize)}
              onValueChange={(val) => onPageSizeChange?.(val || pageSize)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {pageSizeOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
