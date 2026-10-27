import type { TStoryCommentPaginationResponse } from "./story-comment-pagination-response";

// Item of GET /stories/:identifier/comments/:commentId/replies. action_list
// is_can_pin / is_can_unpin are always false on replies
export type TStoryCommentReplyPaginationResponse = Omit<
  TStoryCommentPaginationResponse,
  "reply_count"
>;
