import type { TEventActionList } from "@/api/main/modules/master/events/types/event-action-list";

export type TEventDetailActionList = TEventActionList & {
  is_can_complete: boolean;
  is_can_add_members: boolean;
  is_can_remove_members: boolean;
  is_can_create_guest_user: boolean;
};
