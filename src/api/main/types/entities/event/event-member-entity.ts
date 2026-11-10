import type { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";
import type { TEventMemberUser } from "./event-member-user";

// Member list item (public, board and master): no updated_at
export type TEventMemberEntity = {
  id: string;
  status: EventMemberStatusEnum;
  user: TEventMemberUser;
  created_at: string;
};
