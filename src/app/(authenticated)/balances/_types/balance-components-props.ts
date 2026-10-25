export type TBalanceTab = "experience" | "gold";

export type TBalanceLogItem = {
  id: string;
  createdAt: string;
  typeLabel: string;
  description: string | null;
  // Already signed: positive is a gain, negative a loss
  amount: number;
  unit: string;
};

export type TBalanceTypeItem = { label: string; value: string };

export type TBalanceLogListProps = {
  data: TBalanceLogItem[];
  isLoading: boolean;
  isError: boolean;
  isFiltered: boolean;
  page: number;
  pageCount: number;
  rowCount: number;
  typeItems: TBalanceTypeItem[];
  typeValue: string;
  typeAriaLabel: string;
  // Optional second filter; omit to show only the type filter
  directionItems?: TBalanceTypeItem[];
  directionValue?: string;
  directionAriaLabel?: string;
  onDirectionChange?: (value: string) => void;
  emptyTitle: string;
  emptyDescription: string;
  onTypeChange: (value: string) => void;
  onRetry: () => void;
  onReset: () => void;
  onPageChange: (page: number) => void;
};

export type TBalanceLogPanelProps = {
  page: number;
  type: number | null;
  direction: number | null;
  onPageChange: (page: number) => void;
  onTypeChange: (type: number | null) => void;
  onDirectionChange: (direction: number | null) => void;
  onFilterReset: () => void;
};

export type TBalanceLogRowProps = { item: TBalanceLogItem };

export type TBalancePaginationProps = {
  page: number;
  pageCount: number;
  rowCount: number;
  itemCount: number;
  onPageChange: (page: number) => void;
};

export type TBalanceEmptyStateProps = {
  title: string;
  description: string;
  isFiltered: boolean;
  onReset: () => void;
};

export type TBalanceErrorStateProps = { onRetry: () => void };

export type TBalanceAmountDialogProps = {
  value: number;
  unit: string;
  label: string;
  // Always show + / − (log amounts)
  isSigned?: boolean;
  className?: string;
};
