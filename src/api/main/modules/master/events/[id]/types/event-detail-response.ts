import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { TEventEntity } from "@/api/main/types/entities/event/event-entity";
import type { TEventDetailActionList } from "./event-detail-action-list";

export type TEventDetailResponse = TEventEntity & {
  status_before: EventStatusEnum | null;
  action_list: TEventDetailActionList;
};
