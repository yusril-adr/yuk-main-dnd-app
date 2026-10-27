import type { TStoryCommentPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-pagination-response";
import type { TStoryCommentReplyPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reply-pagination-response";

// The reaction row has something to show: chips (any count) or the add
// button (is_can_react). Deleted placeholders show nothing
export function hasPublicStoryCommentReactions(
  comment:
    TStoryCommentPaginationResponse | TStoryCommentReplyPaginationResponse,
) {
  return (
    !comment.is_deleted &&
    (comment.action_list.is_can_react || comment.reaction_count > 0)
  );
}
