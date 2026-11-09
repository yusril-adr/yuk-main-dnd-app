import type { StoryCommentReactionTypeEnum } from "../enums/story-comment-reaction-type";
import type { TStoryCommentReactionUser } from "./story-comment-reaction-user";

// Item of GET /stories/:identifier/comments/:commentId/reactions
export type TStoryCommentReactionPaginationResponse = {
  id: string;
  type: StoryCommentReactionTypeEnum;
  created_at: string;
  user: TStoryCommentReactionUser;
};
