import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";
import type { TStoryCommentReplyPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reply-pagination-response";

export type TPublicStoryCommentReactionsProps = {
  storyId: string;
  comment:
    TStoryCommentPaginationResponse | TStoryCommentReplyPaginationResponse;
  // Slightly smaller chips inside a thread
  isReply?: boolean;
  className?: string;
};
