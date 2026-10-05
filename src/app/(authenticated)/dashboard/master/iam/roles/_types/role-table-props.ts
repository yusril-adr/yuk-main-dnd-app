import type { ColumnFiltersState } from "@tanstack/react-table";

import type { TRoleTableCol } from "./role-table-col";
import type { TTableFilterForm } from "@/app/_types/table-action-handler";
import type { TTableQuery } from "@/app/_types/table-query";

export type TRoleTableFilterValues = {
  isShowInPublic: string | null;
};

export type TRoleTableActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortingChange: (key: string) => void;
  onSearchChange: (value: string) => void;
  onDeleteRole: (id: string) => void;
  onFilterForm: TTableFilterForm<TRoleTableFilterValues>;
};

export type TRoleTableProps = {
  data: TRoleTableCol[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TTableQuery;
  columnFilters: ColumnFiltersState;
  onActionHandler: TRoleTableActionHandler;
};
