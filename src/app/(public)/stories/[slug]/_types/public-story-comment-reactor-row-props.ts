import type { TStoryCommentReactionPaginationResponse } from "@/api/main/modules/stories/[id]/comments/types/story-comment-reaction-pagination-response";

export type TPublicStoryCommentReactorRowProps = {
  reaction: TStoryCommentReactionPaginationResponse;
  // The logged-in user's own reaction: "You" label
  isMine: boolean;
  // Remove button on your own row (the comment's is_can_react)
  isCanRemove: boolean;
  onRemove: () => void;
  isRemoving: boolean;
};
