import { Globe, MapPin, type LucideIcon } from "lucide-react";

import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

// Avatars shown on the Party card; the dialog loads the rest
export const BOARD_EVENT_MEMBER_PREVIEW_COUNT = 7;
export const BOARD_EVENT_MEMBER_DIALOG_PER_PAGE = 10;

export const BOARD_EVENT_LOCATION_TYPE_ICON: Record<
  EventLocationTypeEnum,
  LucideIcon
> = {
  [EventLocationTypeEnum.ONLINE]: Globe,
  [EventLocationTypeEnum.OFFLINE]: MapPin,
};
