import type { ReactNode } from "react";

import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";
import type { TStoryCommentReplyPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reply-pagination-response";

export type TPublicStoryCommentItemProps = {
  storyId: string;
  comment:
    TStoryCommentPaginationResponse | TStoryCommentReplyPaginationResponse;
  // Compact, borderless row inside a thread
  isReply?: boolean;
  // Rendered under the content (the thread: reply action, replies, form)
  children?: ReactNode;
};
