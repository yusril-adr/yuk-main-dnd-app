import type { TPublicStorySortBy } from "@/api/main/modules/stories/consts/public-story-sort-by";

export type TPublicStoryCardListSortBy = Extract<
  TPublicStorySortBy,
  | "title"
  | "type"
  | "game_system"
  | "max_members"
  | "start_at"
  | "location_type"
  | "created_at"
  | "updated_at"
>;
