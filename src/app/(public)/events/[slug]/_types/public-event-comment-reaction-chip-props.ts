import type { TPublicEventCommentReactionOption } from "./public-event-comment-reaction-option";

export type TPublicEventCommentReactionChipProps = {
  option: TPublicEventCommentReactionOption;
  count: number;
  // The caller's own reaction is this type
  isMine: boolean;
  isReply: boolean;
  // Opens the who-reacted dialog on this type's tab
  onOpen: () => void;
};
