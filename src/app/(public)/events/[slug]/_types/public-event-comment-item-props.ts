import type { ReactNode } from "react";

import type { TEventCommentPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-pagination-response";
import type { TEventCommentReplyPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-reply-pagination-response";

export type TPublicEventCommentItemProps = {
  eventId: string;
  comment:
    TEventCommentPaginationResponse | TEventCommentReplyPaginationResponse;
  // Compact, borderless row inside a thread
  isReply?: boolean;
  // Rendered under the content (the thread: reply action, replies, form)
  children?: ReactNode;
};
