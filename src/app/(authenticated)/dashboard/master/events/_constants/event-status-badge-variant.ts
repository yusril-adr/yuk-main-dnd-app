import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";

export const EVENT_STATUS_BADGE_VARIANT: Record<
  EventStatusEnum,
  "default" | "secondary" | "outline" | "destructive"
> = {
  [EventStatusEnum.PUBLISHED]: "default",
  [EventStatusEnum.DRAFT]: "secondary",
  [EventStatusEnum.ARCHIVED]: "outline",
  [EventStatusEnum.CANCELLED]: "outline",
  [EventStatusEnum.COMPLETED]: "outline",
};
