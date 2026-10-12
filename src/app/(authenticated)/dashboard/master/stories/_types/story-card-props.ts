import type { TStoryPaginationResponse } from "@/api/main/modules/master/stories/types/story-pagination-response";

export type TStoryCardProps = {
  story: TStoryPaginationResponse;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onPublish?: (id: string) => void;
  onDelete?: (id: string) => void;
};
