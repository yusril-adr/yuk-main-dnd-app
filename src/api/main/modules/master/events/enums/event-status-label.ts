import { EventStatusEnum } from "./event-status";

export const EVENT_STATUS_LABEL: Record<EventStatusEnum, string> = {
  [EventStatusEnum.DRAFT]: "Draft",
  [EventStatusEnum.PUBLISHED]: "Published",
  [EventStatusEnum.ARCHIVED]: "Archived",
  [EventStatusEnum.CANCELLED]: "Cancelled",
  [EventStatusEnum.COMPLETED]: "Completed",
};
