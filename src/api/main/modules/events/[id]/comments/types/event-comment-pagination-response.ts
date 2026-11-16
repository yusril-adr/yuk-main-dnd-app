import type { TEventCommentEntity } from "@/api/main/types/entities/event/event-comment-entity";
import type { EventCommentReactionTypeEnum } from "../enums/event-comment-reaction-type";
import type { TEventCommentActionList } from "./event-comment-action-list";
import type { TEventCommentReactionCounts } from "./event-comment-reaction-counts";

// Item of GET /events/:identifier/comments (top-level comments only). Replies
// have the same shape without reply_count (TEventCommentReplyPaginationResponse)
export type TEventCommentPaginationResponse = TEventCommentEntity & {
  // Non-deleted replies
  reply_count: number;
  reaction_counts: TEventCommentReactionCounts;
  reaction_count: number;
  // null when logged out or not reacted
  my_reaction: EventCommentReactionTypeEnum | null;
  action_list: TEventCommentActionList;
};
