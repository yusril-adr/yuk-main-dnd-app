import type { TEventCardListFilters } from "./event-card-list-filters";

export type TEventCardListActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: TEventCardListFilters) => void;
  onArchiveEvent: (id: string) => void;
  onUnarchiveEvent: (id: string) => void;
  onPublishEvent: (id: string) => void;
  onCancelEvent: (id: string) => void;
  onDeleteEvent: (id: string) => void;
};
