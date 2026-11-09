import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";

export type TPublicStoryCommentReactorListProps = {
  storyId: string;
  commentId: string;
  // undefined lists every type (the All tab)
  type?: StoryCommentReactionTypeEnum;
  // The comment's my_reaction: pinned "You" row on All and on its own tab
  myReaction: StoryCommentReactionTypeEnum | null;
  // The comment's is_can_react: your own row gets a Remove button
  isCanReact: boolean;
  onRemove: () => void;
  isRemoving: boolean;
};
