import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import type { TPublicStoryPaginationResponse } from "@/api/main/modules/stories/types/public-story-pagination-response";

export type TPublicStoryCardProps = {
  story: TPublicStoryPaginationResponse;
  priority?: boolean;
};

export type TPublicStoryBannerProps = {
  bannerUrl: string | null;
  title: string;
  className?: string;
  iconClassName?: string;
  // next/image sizes; defaults to the list grid columns
  sizes?: string;
  // Above-the-fold image (detail hero): load eagerly
  priority?: boolean;
};

export type TPublicStoryStatusBadgeProps = {
  status: StoryStatusEnum;
  className?: string;
};

export type TPublicStoryTypeBadgeProps = {
  type: StoryTypeEnum;
  className?: string;
};

export type TPublicStoryLocationBadgeProps = {
  locationType: StoryLocationTypeEnum;
  className?: string;
};

export type TPublicStoryEmptyStateProps = {
  isFiltered: boolean;
  onReset: () => void;
};

export type TPublicStoryErrorStateProps = {
  title?: string;
  description?: string;
  onRetry: () => void;
};

export type TPublicStoryPaginationProps = {
  page: number;
  pageCount: number;
  rowCount: number;
  itemCount: number;
  onPageChange: (page: number) => void;
};

export type TPublicStoryListHeroProps = {
  totalStories: number | null;
};
