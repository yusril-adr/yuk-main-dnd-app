import type { TPublicStoryCommentReactionOption } from "./public-story-comment-reaction-option";

export type TPublicStoryCommentReactionChipProps = {
  option: TPublicStoryCommentReactionOption;
  count: number;
  // The caller's own reaction is this type
  isMine: boolean;
  isReply: boolean;
  // Opens the who-reacted dialog on this type's tab
  onOpen: () => void;
};
