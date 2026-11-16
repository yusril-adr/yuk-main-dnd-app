import type { TEventCommentPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-pagination-response";
import type { TEventCommentReplyPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-reply-pagination-response";

// The reaction row has something to show: chips (any count) or the add
// button (is_can_react). Deleted placeholders show nothing
export function hasPublicEventCommentReactions(
  comment:
    TEventCommentPaginationResponse | TEventCommentReplyPaginationResponse,
) {
  return (
    !comment.is_deleted &&
    (comment.action_list.is_can_react || comment.reaction_count > 0)
  );
}
