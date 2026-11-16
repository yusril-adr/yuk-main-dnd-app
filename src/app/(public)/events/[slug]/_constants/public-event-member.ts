import { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

// Members loaded per "Show more" batch
export const PUBLIC_EVENT_MEMBER_PER_PAGE = 6;

// Medieval wording for the member status
export const PUBLIC_EVENT_MEMBER_STATUS_LABEL: Record<
  EventMemberStatusEnum,
  string
> = {
  [EventMemberStatusEnum.REGISTERED]: "Enlisted",
  [EventMemberStatusEnum.ATTENDED]: "Attended",
  [EventMemberStatusEnum.ABSENT]: "Absent",
};

// Badge variants per member status (Absent uses a destructive outline tint)
export const PUBLIC_EVENT_MEMBER_STATUS_BADGE_VARIANT: Record<
  EventMemberStatusEnum,
  "default" | "secondary" | "outline"
> = {
  [EventMemberStatusEnum.REGISTERED]: "secondary",
  [EventMemberStatusEnum.ATTENDED]: "default",
  [EventMemberStatusEnum.ABSENT]: "outline",
};
