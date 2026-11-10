import type { TEventEntity } from "@/api/main/types/entities/event/event-entity";
import type { TPublicEventDetailActionList } from "./public-event-detail-action-list";

export type TPublicEventDetailResponse = TEventEntity & {
  action_list: TPublicEventDetailActionList;
};
