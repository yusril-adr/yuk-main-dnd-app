import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";

export type TEventStatusBadgeProps = {
  status: EventStatusEnum;
  /** When set (e.g. from the list catalog), overrides EVENT_STATUS_LABEL. */
  label?: string;
};
