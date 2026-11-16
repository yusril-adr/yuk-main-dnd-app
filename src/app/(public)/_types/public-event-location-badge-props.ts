import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

export type TPublicEventLocationBadgeProps = {
  locationType: EventLocationTypeEnum;
  label: string;
  className?: string;
};
