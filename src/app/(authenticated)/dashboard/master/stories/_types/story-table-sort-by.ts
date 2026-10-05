import type { TStorySortBy } from "@/api/main/modules/master/stories/consts/story-sort-by";

export type TStoryTableSortBy = Exclude<
  TStorySortBy,
  "id" | "slug" | "description" | "location_detail"
>;
