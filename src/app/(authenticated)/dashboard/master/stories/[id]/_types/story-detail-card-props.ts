import type { TStoryResponse } from "@/api/main/modules/master/stories/types/story-response";

export type TStoryDetailCardProps = {
  story: TStoryResponse;
  className?: string;
};
