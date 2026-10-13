import {
  BookOpen,
  Globe,
  MapPin,
  Swords,
  type LucideIcon,
} from "lucide-react";

import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

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
