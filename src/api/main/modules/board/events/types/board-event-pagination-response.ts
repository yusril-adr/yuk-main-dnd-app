import type { TEventEntity } from "@/api/main/types/entities/event/event-entity";
import type { TEventCreator } from "@/api/main/types/entities/event/event-creator";
import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

// Events the caller is a member of, with their own member status. The
// creator has no username here
export type TBoardEventPaginationResponse = Omit<
  TEventEntity,
  | "exp_awarded"
  | "point_awarded"
  | "location_detail"
  | "updated_at"
  | "created_by"
> & {
  joined_members: number;
  member_status: EventMemberStatusEnum;
  created_by?: Omit<TEventCreator, "username">;
};
