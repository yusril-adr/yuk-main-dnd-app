import type { ColumnFiltersState } from "@tanstack/react-table";

import type { TStoryTableCol } from "./story-table-col";
import type { TTableFilterForm } from "@/app/_types/table-action-handler";
import type { TTableQuery } from "@/app/_types/table-query";

export type TStoryTableFilterValues = {
  status: string | null;
  type: string | null;
  locationType: string | null;
  createdBy: string | null;
};

export type TStoryTableUserItem = {
  value: string;
  label: string;
};

export type TStoryTableActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortingChange: (key: string) => void;
  onSearchChange: (value: string) => void;
  onDeleteStory: (id: string) => void;
  onUserSearchChange: (value: string) => void;
  onFilterForm: TTableFilterForm<TStoryTableFilterValues>;
};

export type TStoryTableProps = {
  data: TStoryTableCol[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TTableQuery;
  columnFilters: ColumnFiltersState;
  userItems: TStoryTableUserItem[];
  canFilterByCreator: boolean;
  onActionHandler: TStoryTableActionHandler;
};
