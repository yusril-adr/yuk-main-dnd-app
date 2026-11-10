import type { TEventCardListFilters } from "./event-card-list-filters";

export type TEventCardListActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: TEventCardListFilters) => void;
};
