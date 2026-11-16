import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

export const BOARD_EVENT_PAGE_SIZE = 12;

export const BOARD_EVENT_FILTER_ALL = "all";

// Shown in the browser's local time
export const BOARD_EVENT_DATE_FORMAT = "D MMM YYYY, HH:mm";
export const BOARD_EVENT_START_AT_FORMAT = "ddd, D MMM YYYY · HH:mm";

// Draft events cannot have members, so they are left out
export const BOARD_EVENT_STATUS_OPTIONS = [
  EventStatusEnum.PUBLISHED,
  EventStatusEnum.COMPLETED,
  EventStatusEnum.CANCELLED,
  EventStatusEnum.ARCHIVED,
] as const;

export const BOARD_EVENT_MEMBER_STATUS_OPTIONS = [
  EventMemberStatusEnum.REGISTERED,
  EventMemberStatusEnum.ABSENT,
  EventMemberStatusEnum.ATTENDED,
] as const;

// Solid, low-key badge styles (no gradients)
export const BOARD_EVENT_STATUS_CLASS: Record<EventStatusEnum, string> = {
  [EventStatusEnum.DRAFT]: "border-border bg-muted text-foreground/80",
  [EventStatusEnum.PUBLISHED]: "border-primary/40 bg-primary/10 text-primary",
  [EventStatusEnum.COMPLETED]:
    "border-emerald-700/40 bg-emerald-700/10 text-emerald-800 dark:text-emerald-300",
  [EventStatusEnum.CANCELLED]:
    "border-destructive/40 bg-destructive/10 text-destructive",
  [EventStatusEnum.ARCHIVED]: "border-border bg-muted text-foreground/70",
};

export const BOARD_EVENT_MEMBER_STATUS_CLASS: Record<
  EventMemberStatusEnum,
  string
> = {
  [EventMemberStatusEnum.REGISTERED]: "border-primary/40 bg-card text-primary",
  [EventMemberStatusEnum.ABSENT]: "border-border bg-card text-foreground/80",
  [EventMemberStatusEnum.ATTENDED]:
    "border-emerald-700/40 bg-card text-emerald-800 dark:text-emerald-300",
};
