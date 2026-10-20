import type { TStorySortBy } from "@/api/main/modules/master/stories/consts/story-sort-by";

export type TStoryCardListSortBy = Extract<
  TStorySortBy,
  | "title"
  | "status"
  | "type"
  | "game_system"
  | "max_members"
  | "exp_awarded"
  | "point_awarded"
  | "start_at"
  | "location_type"
  | "created_at"
  | "updated_at"
>;
