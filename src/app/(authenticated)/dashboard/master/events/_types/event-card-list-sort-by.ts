import type { TEventSortBy } from "@/api/main/modules/master/events/consts/event-sort-by";

export type TEventCardListSortBy = Extract<
  TEventSortBy,
  | "title"
  | "status"
  | "max_members"
  | "exp_awarded"
  | "point_awarded"
  | "start_at"
  | "location_type"
  | "created_at"
  | "updated_at"
>;
