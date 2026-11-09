import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";

export type TPublicStoryCommentReactButtonProps = {
  myReaction: StoryCommentReactionTypeEnum | null;
  // "comment" or "reply", for the aria labels
  noun: string;
  isReply: boolean;
  // null removes the caller's reaction
  onReact: (type: StoryCommentReactionTypeEnum | null) => void;
};
