import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";

export type TPublicStoryCommentReactButtonProps = {
  // "comment" or "reply", for the aria labels
  noun: string;
  isReply: boolean;
  onReact: (type: StoryCommentReactionTypeEnum) => void;
};
