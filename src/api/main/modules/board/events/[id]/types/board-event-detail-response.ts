import type { TEventEntity } from "@/api/main/types/entities/event/event-entity";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { TBoardEventDetailActionList } from "./board-event-detail-action-list";

// No member status or member count here; members come from /:id/members
export type TBoardEventDetailResponse = TEventEntity & {
  status_before: EventStatusEnum | null;
  action_list: TBoardEventDetailActionList;
};
