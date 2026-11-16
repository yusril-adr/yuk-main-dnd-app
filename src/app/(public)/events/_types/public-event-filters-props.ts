import type {
  TPublicEventCardListFilters,
  TPublicEventCardListQueryTable,
} from "./public-event-card-list-props";

export type TPublicEventFiltersProps = {
  queryTable: TPublicEventCardListQueryTable;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: TPublicEventCardListFilters) => void;
};
