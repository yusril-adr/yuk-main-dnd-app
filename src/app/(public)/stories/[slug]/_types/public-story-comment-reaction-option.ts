import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";
import type { TStoryCommentReactionCounts } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reaction-counts";

export type TPublicStoryCommentReactionOption = {
  type: StoryCommentReactionTypeEnum;
  // Key of the type in reaction_counts
  countKey: keyof TStoryCommentReactionCounts;
  emoji: string;
  label: string;
};
