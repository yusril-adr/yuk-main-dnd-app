import type { TStoryCommentEntity } from "@/api/main/types/entities/story/story-comment-entity";
import type { StoryCommentReactionTypeEnum } from "../enums/story-comment-reaction-type";
import type { TStoryCommentActionList } from "./story-comment-action-list";
import type { TStoryCommentReactionCounts } from "./story-comment-reaction-counts";

// Item of GET /stories/:identifier/comments (top-level comments only). Replies
// have the same shape without reply_count (TStoryCommentReplyPaginationResponse)
export type TStoryCommentPaginationResponse = TStoryCommentEntity & {
  // Non-deleted replies
  reply_count: number;
  reaction_counts: TStoryCommentReactionCounts;
  reaction_count: number;
  // null when logged out or not reacted
  my_reaction: StoryCommentReactionTypeEnum | null;
  action_list: TStoryCommentActionList;
};
