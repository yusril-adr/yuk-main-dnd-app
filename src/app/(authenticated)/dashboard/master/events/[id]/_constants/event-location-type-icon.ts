import { Globe, MapPin, type LucideIcon } from "lucide-react";

import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

export const EVENT_LOCATION_TYPE_ICON: Record<
  EventLocationTypeEnum,
  LucideIcon
> = {
  [EventLocationTypeEnum.ONLINE]: Globe,
  [EventLocationTypeEnum.OFFLINE]: MapPin,
};
