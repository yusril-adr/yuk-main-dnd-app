import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";
import { PUBLIC_STORY_COMMENT_REACTIONS } from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";

// Emoji and count key of a reaction type
export function getPublicStoryCommentReactionOption(
  type: StoryCommentReactionTypeEnum,
) {
  return PUBLIC_STORY_COMMENT_REACTIONS.find((option) => option.type === type);
}
