import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";

// The public API only returns (and only accepts as a filter) these statuses
export const PUBLIC_EVENT_STATUS_OPTIONS = [
  EventStatusEnum.PUBLISHED,
  EventStatusEnum.COMPLETED,
] as const;
