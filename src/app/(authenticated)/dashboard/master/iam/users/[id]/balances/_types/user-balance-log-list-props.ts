import type { LucideIcon } from "lucide-react";

import type { TUserBalanceLogQuery } from "../_utils/user-balance-log-payload";

export type TUserBalanceLogRow = {
  id: string;
  amount: number;
  type: number;
  // EXP logs only (increment/decrement); GP logs carry income/expense in type
  direction?: number;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type TUserBalanceLogListFilter<TType extends number> = {
  type: TType | null;
  direction: number | null;
};

export type TUserBalanceLogListProps<TType extends number> = {
  data: TUserBalanceLogRow[];
  isLoading: boolean;
  isError: boolean;
  unit: string;
  onRetry: () => void;
  pageCount: number;
  rowCount: number;
  queryTable: TUserBalanceLogQuery;
  typeOptions: TType[];
  typeLabels: Record<TType, string>;
  typeIcons: Record<TType, LucideIcon>;
  // Omit to hide the direction filter
  directionOptions?: number[];
  directionLabels?: Record<number, string>;
  isNegative?: (row: TUserBalanceLogRow) => boolean;
  onPageChange: (page: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filter: TUserBalanceLogListFilter<TType>) => void;
};
