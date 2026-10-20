import type {
  TPublicStoryCardListFilters,
  TPublicStoryCardListQueryTable,
} from "./public-story-card-list-props";

export type TPublicStoryFiltersProps = {
  queryTable: TPublicStoryCardListQueryTable;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: TPublicStoryCardListFilters) => void;
};
