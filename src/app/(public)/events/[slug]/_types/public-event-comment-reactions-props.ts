import type { TEventCommentPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-pagination-response";
import type { TEventCommentReplyPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-reply-pagination-response";

export type TPublicEventCommentReactionsProps = {
  eventId: string;
  comment:
    TEventCommentPaginationResponse | TEventCommentReplyPaginationResponse;
  // Slightly smaller chips inside a thread
  isReply?: boolean;
  className?: string;
};
