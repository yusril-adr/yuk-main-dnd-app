import type { OrderKeyEnum } from "@/common/enums/order-key";
import type { TPublicStoryPaginationResponse } from "@/api/main/modules/stories/types/public-story-pagination-response";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import type { TPublicStoryCardListSortBy } from "./public-story-card-list-sort-by";

export type TPublicStoryStatus =
  StoryStatusEnum.PUBLISHED | StoryStatusEnum.COMPLETED;

export type TPublicStoryCardListFilters = {
  sortBy: TPublicStoryCardListSortBy | null;
  order: OrderKeyEnum | null;
  status: TPublicStoryStatus | null;
  type: StoryTypeEnum | null;
  locationType: StoryLocationTypeEnum | null;
};

export type TPublicStoryCardListQueryTable = TPublicStoryCardListFilters & {
  page: number;
  search: string;
};

export type TPublicStoryCardListActionHandler = {
  onPageChange: (page: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: TPublicStoryCardListFilters) => void;
};

export type TPublicStoryCardListProps = {
  data: TPublicStoryPaginationResponse[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  // Clears search and every filter
  onReset: () => void;
  pageCount: number;
  rowCount: number;
  queryTable: TPublicStoryCardListQueryTable;
  onActionHandler: TPublicStoryCardListActionHandler;
};
