import type { TPublicStoryPaginationResponse } from "@/api/main/modules/stories/types/public-story-pagination-response";

export type TPublicUserCreatedStoryPaginationResponse =
  TPublicStoryPaginationResponse;

// Joined stories also carry the guildmate's membership status in that story
export type TPublicUserJoinedStoryPaginationResponse =
  TPublicStoryPaginationResponse & {
    member_status: number;
  };
