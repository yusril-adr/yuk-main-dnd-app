import type { TStoryResponse } from "@/api/main/modules/master/stories/types/story-response";

export type TStoryCardProps = {
  story: TStoryResponse;
  onDelete?: (id: string) => void;
};
