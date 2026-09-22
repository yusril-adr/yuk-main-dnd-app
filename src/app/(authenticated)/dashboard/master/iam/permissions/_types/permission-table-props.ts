import type { ColumnFiltersState } from "@tanstack/react-table";

import type { TTableActionHandler } from "@/app/_types/table-action-handler";
import type { TTableQuery } from "@/app/_types/table-query";
import type { TPermissionTableCol } from "@/app/(authenticated)/dashboard/master/iam/permissions/_types/permission-table-col";

export type TPermissionTableFilterValues = {
  module: string | null;
  action: string | null;
};

export type TPermissionTableActionHandler =
  TTableActionHandler<TPermissionTableFilterValues>;

export type TPermissionTableProps = {
  data: TPermissionTableCol[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TTableQuery;
  columnFilters: ColumnFiltersState;
  onActionHandler: TPermissionTableActionHandler;
};
