import type { TPublicStoryDetailResponse } from "@/api/main/modules/stories/[id]/types/public-story-detail-response";

export type TPublicStoryDetailProps = {
  story: TPublicStoryDetailResponse;
  className?: string;
};
