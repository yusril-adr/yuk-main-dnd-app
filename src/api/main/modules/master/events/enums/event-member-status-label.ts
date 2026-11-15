import { EventMemberStatusEnum } from "./event-member-status";

export const EVENT_MEMBER_STATUS_LABEL: Record<EventMemberStatusEnum, string> =
  {
    [EventMemberStatusEnum.REGISTERED]: "Registered",
    [EventMemberStatusEnum.ABSENT]: "Absent",
    [EventMemberStatusEnum.ATTENDED]: "Attended",
  };
