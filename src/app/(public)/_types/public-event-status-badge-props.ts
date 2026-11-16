import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";

export type TPublicEventStatusBadgeProps = {
  status: EventStatusEnum;
  label: string;
  className?: string;
};
