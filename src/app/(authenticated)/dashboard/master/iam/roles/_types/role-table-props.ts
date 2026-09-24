import type { TRoleTableCol } from "./role-table-col";
import type { TTableQuery } from "@/app/_types/table-query";

export type TRoleTableActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortingChange: (key: string) => void;
  onSearchChange: (value: string) => void;
  onDeleteRole: (id: string) => void;
};

export type TRoleTableProps = {
  data: TRoleTableCol[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TTableQuery;
  onActionHandler: TRoleTableActionHandler;
};
