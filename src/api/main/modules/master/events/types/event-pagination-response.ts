import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { TEventEntity } from "@/api/main/types/entities/event/event-entity";
import type { TEventActionList } from "./event-action-list";

export type TEventPaginationResponse = TEventEntity & {
  status_before: EventStatusEnum | null;
  action_list: TEventActionList;
};
