import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";

export type TEventEditFormActionsProps = {
  cancelHref: string;
  disabled: boolean;
  isPending: boolean;
  currentStatus?: EventStatusEnum;
  onSave: () => void;
};
