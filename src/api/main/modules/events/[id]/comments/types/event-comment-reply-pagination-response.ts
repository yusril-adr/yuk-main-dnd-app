import type { TEventCommentPaginationResponse } from "./event-comment-pagination-response";

// Item of GET /events/:identifier/comments/:commentId/replies. action_list
// is_can_pin / is_can_unpin are always false on replies
export type TEventCommentReplyPaginationResponse = Omit<
  TEventCommentPaginationResponse,
  "reply_count"
>;
