import type { TPublicStoryDetailResponse } from "@/api/main/modules/stories/[id]/types/public-story-detail-response";

export type TPublicStoryCommentsProps = {
  story: TPublicStoryDetailResponse;
  className?: string;
};
