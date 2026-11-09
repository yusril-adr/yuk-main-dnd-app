import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";
import type { TStoryCommentReactionUser } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reaction-user";

export type TPublicStoryCommentReactorRowProps = {
  type: StoryCommentReactionTypeEnum;
  user: TStoryCommentReactionUser;
  // The logged-in user's own (pinned) row: "You" label
  isMine?: boolean;
  // Remove button on your own row (the comment's is_can_react)
  isCanRemove?: boolean;
  onRemove?: () => void;
  isRemoving?: boolean;
};
