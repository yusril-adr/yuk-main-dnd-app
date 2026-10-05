import type { OrderKeyEnum } from "@/common/enums/order-key";
import type { TStoryResponse } from "@/api/main/modules/master/stories/types/story-response";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import type { TStoryCardListSortBy } from "./story-card-list-sort-by";

export type TStoryCardListFilters = {
  sortBy: TStoryCardListSortBy | null;
  order: OrderKeyEnum | null;
  status: StoryStatusEnum | null;
  type: StoryTypeEnum | null;
  locationType: StoryLocationTypeEnum | null;
  createdBy: string | null;
};

export type TStoryCardListQueryTable = TStoryCardListFilters & {
  page: number;
  pageSize: number;
  search: string;
};

export type TStoryCardListUserItem = {
  value: string;
  label: string;
};

export type TStoryCardListActionHandler = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: TStoryCardListFilters) => void;
  onDeleteStory: (id: string) => void;
};

export type TStoryCardListProps = {
  data: TStoryResponse[];
  isLoading: boolean;
  pageCount: number;
  rowCount: number;
  queryTable: TStoryCardListQueryTable;
  userItems: TStoryCardListUserItem[];
  canFilterByCreator: boolean;
  onUserSearchChange: (value: string) => void;
  onActionHandler: TStoryCardListActionHandler;
};
