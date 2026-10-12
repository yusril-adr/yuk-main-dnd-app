import type { TStoryPaginationResponse } from "@/api/main/modules/master/stories/types/story-pagination-response";

export type TStoryDetailCardProps = {
  story: TStoryPaginationResponse;
  className?: string;
};
