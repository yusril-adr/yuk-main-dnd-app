import type { LucideIcon } from "lucide-react";

import type { TUserBalanceLogQuery } from "../_utils/user-balance-log-payload";

export type TUserBalanceLogRow = {
  id: string;
  amount: number;
  type: number;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type TUserBalanceLogListFilter<TType extends number> = {
  type: TType | null;
};

export type TUserBalanceLogListProps<TType extends number> = {
  data: TUserBalanceLogRow[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TUserBalanceLogQuery;
  typeOptions: TType[];
  typeLabels: Record<TType, string>;
  typeIcons: Record<TType, LucideIcon>;
  isExpense?: (type: TType) => boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filter: TUserBalanceLogListFilter<TType>) => void;
};
