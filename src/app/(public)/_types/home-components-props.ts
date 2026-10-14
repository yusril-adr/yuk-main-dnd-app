import type { LucideIcon } from "lucide-react";

import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { TPublicStoryPaginationResponse } from "@/api/main/modules/stories/types/public-story-pagination-response";
import type { TPublicUserPaginationResponse } from "@/api/main/modules/users/types/public-user-pagination-response";

export type THomeSectionHeaderProps = {
  id: string;
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
};

export type THomeStoriesSectionProps = {
  id: string;
  status: StoryStatusEnum.PUBLISHED | StoryStatusEnum.COMPLETED;
  title: string;
  description: string;
  emptyText: string;
};

export type THomeStoryCardProps = {
  story: TPublicStoryPaginationResponse;
};

export type THomeLegendEntry = {
  user: TPublicUserPaginationResponse;
  gainedExp: number;
  level: number;
};

export type THomeLegendBoardProps = {
  title: string;
  icon: LucideIcon;
  levelLabel: string;
  entries: THomeLegendEntry[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export type THomeEmptyStateProps = {
  text: string;
};

export type THomeErrorStateProps = {
  text: string;
  onRetry: () => void;
};

export type THomeGuildPhoto = {
  src?: string;
  alt: string;
  caption?: string;
  // CSS object-position to keep faces in frame when cropped to 16:9
  objectPosition?: string;
};

export type THomeGuildSlideProps = {
  photo: THomeGuildPhoto;
};
