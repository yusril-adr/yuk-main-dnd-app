import { Globe, MapPin, type LucideIcon } from "lucide-react";

import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

export const STORY_LOCATION_TYPE_ICON: Record<
  StoryLocationTypeEnum,
  LucideIcon
> = {
  [StoryLocationTypeEnum.ONLINE]: Globe,
  [StoryLocationTypeEnum.OFFLINE]: MapPin,
};
