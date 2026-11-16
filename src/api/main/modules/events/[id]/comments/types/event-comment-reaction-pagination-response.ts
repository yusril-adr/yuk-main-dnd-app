import type { EventCommentReactionTypeEnum } from "../enums/event-comment-reaction-type";
import type { TEventCommentReactionUser } from "./event-comment-reaction-user";

// Item of GET /events/:identifier/comments/:commentId/reactions
export type TEventCommentReactionPaginationResponse = {
  id: string;
  type: EventCommentReactionTypeEnum;
  created_at: string;
  user: TEventCommentReactionUser;
};
