import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";

export type TPublicStoryCommentItemProps = {
  storyId: string;
  comment: TStoryCommentPaginationResponse;
};
