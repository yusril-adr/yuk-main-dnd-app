import type { TEventCardListFilters } from "./event-card-list-filters";

export type TEventCardListQueryTable = TEventCardListFilters & {
  page: number;
  pageSize: number;
  search: string;
};
