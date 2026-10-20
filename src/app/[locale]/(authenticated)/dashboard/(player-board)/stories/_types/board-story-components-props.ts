import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import type { TBoardStoryPaginationResponse } from "@/api/main/modules/board/stories/types/board-story-pagination-response";

export type TBoardStoryFilterValues = {
  status: StoryStatusEnum | null;
  memberStatus: StoryMemberStatusEnum | null;
};

export type TBoardStoryFiltersProps = TBoardStoryFilterValues & {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: TBoardStoryFilterValues) => void;
};

export type TBoardStoryCardProps = {
  story: TBoardStoryPaginationResponse;
};

export type TBoardStoryCardListProps = {
  data: TBoardStoryPaginationResponse[];
  isLoading: boolean;
  isError: boolean;
  isFiltered: boolean;
  page: number;
  pageCount: number;
  rowCount: number;
  onRetry: () => void;
  onReset: () => void;
  onPageChange: (page: number) => void;
};

export type TBoardStoryPaginationProps = {
  page: number;
  pageCount: number;
  rowCount: number;
  itemCount: number;
  onPageChange: (page: number) => void;
};

export type TBoardStoryEmptyStateProps = {
  isFiltered: boolean;
  onReset: () => void;
};

export type TBoardStoryErrorStateProps = {
  title?: string;
  onRetry: () => void;
};

export type TBoardStoryBannerProps = {
  bannerUrl: string | null;
  title: string;
  className?: string;
  priority?: boolean;
};

export type TBoardStoryStatusBadgeProps = {
  status: StoryStatusEnum;
  className?: string;
};

export type TBoardStoryMemberStatusBadgeProps = {
  memberStatus: StoryMemberStatusEnum;
  className?: string;
};
