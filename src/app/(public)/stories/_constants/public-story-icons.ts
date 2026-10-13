import {
  BookOpen,
  CircleCheck,
  Globe,
  MapPin,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";

import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import type { TPublicStoryStatus } from "@/app/(public)/stories/_types/public-story-card-list-props";

export const PUBLIC_STORY_TYPE_ICON: Record<StoryTypeEnum, LucideIcon> = {
  [StoryTypeEnum.ONESHOT]: Swords,
  [StoryTypeEnum.CAMPAIGN]: BookOpen,
};

export const PUBLIC_STORY_LOCATION_TYPE_ICON: Record<
  StoryLocationTypeEnum,
  LucideIcon
> = {
  [StoryLocationTypeEnum.ONLINE]: Globe,
  [StoryLocationTypeEnum.OFFLINE]: MapPin,
};

export const PUBLIC_STORY_STATUS_ICON: Record<TPublicStoryStatus, LucideIcon> =
  {
    [StoryStatusEnum.PUBLISHED]: Sparkles,
    [StoryStatusEnum.COMPLETED]: CircleCheck,
  };
