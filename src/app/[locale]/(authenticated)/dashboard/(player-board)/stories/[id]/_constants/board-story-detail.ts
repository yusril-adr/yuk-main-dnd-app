import { BookOpen, Globe, MapPin, Swords, type LucideIcon } from "lucide-react";

import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

// Avatars shown on the Party card; the dialog loads the rest
export const BOARD_STORY_MEMBER_PREVIEW_COUNT = 7;
export const BOARD_STORY_MEMBER_DIALOG_PER_PAGE = 10;

export const BOARD_STORY_TYPE_ICON: Record<StoryTypeEnum, LucideIcon> = {
  [StoryTypeEnum.ONESHOT]: Swords,
  [StoryTypeEnum.CAMPAIGN]: BookOpen,
};

export const BOARD_STORY_LOCATION_TYPE_ICON: Record<
  StoryLocationTypeEnum,
  LucideIcon
> = {
  [StoryLocationTypeEnum.ONLINE]: Globe,
  [StoryLocationTypeEnum.OFFLINE]: MapPin,
};
