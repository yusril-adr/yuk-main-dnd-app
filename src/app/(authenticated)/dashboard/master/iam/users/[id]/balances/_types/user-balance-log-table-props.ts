import type { TUserBalanceLogQuery } from "../_utils/user-balance-log-payload";

export type TUserBalanceLogRow = {
  id: string;
  amount: number;
  type: number;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type TUserBalanceLogTableProps<TType extends number> = {
  data: TUserBalanceLogRow[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TUserBalanceLogQuery;
  typeOptions: TType[];
  typeLabels: Record<TType, string>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortingChange: (key: string) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (type: TType | null) => void;
};
