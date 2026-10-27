import type { ImageProps } from "next/image";

import type { TStoryPaginationResponse } from "@/api/main/modules/master/stories/types/story-pagination-response";

export type TStoryCardProps = {
  story: TStoryPaginationResponse;
  // Banner loading; "eager" for the above-the-fold cards
  loading?: ImageProps["loading"];
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onPublish?: (id: string) => void;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
};
