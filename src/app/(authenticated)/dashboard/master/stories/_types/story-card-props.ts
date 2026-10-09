import type { TStoryResponse } from "@/api/main/modules/master/stories/types/story-response";

export type TStoryCardProps = {
  story: TStoryResponse;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onPublish?: (id: string) => void;
  onDelete?: (id: string) => void;
};
