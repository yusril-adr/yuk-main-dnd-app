import type { TPublicStoryPaginationResponse } from "@/api/main/modules/stories/types/public-story-pagination-response";

export type TPublicStoryCardProps = {
  story: TPublicStoryPaginationResponse;
  priority?: boolean;
};
