import type { LucideIcon } from "lucide-react";

import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import type { TPublicStoryPaginationResponse } from "@/api/main/modules/stories/types/public-story-pagination-response";
import type { TPublicUserDetailResponse } from "@/api/main/modules/users/types/public-user-detail-response";

export type TPublicGuildmateAdventurerCardProps = {
  guildmate: TPublicUserDetailResponse;
};

export type TPublicGuildmateStatRowProps = {
  icon: LucideIcon;
  label: string;
  exp: number;
  share: number;
};

export type TPublicGuildmateStoriesSectionProps = {
  identifier: string;
};

export type TPublicGuildmateAdventurerCardBackProps = {
  cardNumber: string;
};

export type TPublicGuildmateStoryCardProps = {
  story: TPublicStoryPaginationResponse;
  priority?: boolean;
};

export type TPublicGuildmateStoryBannerProps = {
  bannerUrl: string | null;
  title: string;
  className?: string;
  iconClassName?: string;
  // next/image sizes; defaults to the list grid columns
  sizes?: string;
  // Above-the-fold image (detail hero): load eagerly
  priority?: boolean;
};

export type TPublicGuildmateStoryStatusBadgeProps = {
  status: StoryStatusEnum;
  className?: string;
};

export type TPublicGuildmateStoryTypeBadgeProps = {
  type: StoryTypeEnum;
  className?: string;
};

export type TPublicGuildmateStoryLocationBadgeProps = {
  locationType: StoryLocationTypeEnum;
  className?: string;
};
