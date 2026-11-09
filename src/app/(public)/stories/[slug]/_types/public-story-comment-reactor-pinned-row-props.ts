import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";

export type TPublicStoryCommentReactorPinnedRowProps = {
  // All tab, or the tab of your reaction, while you are logged in and reacted
  isShown: boolean;
  myReaction: StoryCommentReactionTypeEnum | null;
  // Remove button (the comment's is_can_react)
  isCanReact: boolean;
  onRemove: () => void;
  isRemoving: boolean;
};
