import type { TPublicStoryPaginationPayload } from "@/api/main/modules/stories/types/public-story-pagination-payload";

// Created/joined stories of a guildmate; the user comes from the path
export type TPublicUserStoryPaginationPayload = Omit<
  TPublicStoryPaginationPayload,
  "created_by"
>;
