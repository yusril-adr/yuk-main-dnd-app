import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";

export type TPublicEventCommentReactorPinnedRowProps = {
  // All tab, or the tab of your reaction, while you are logged in and reacted
  isShown: boolean;
  myReaction: EventCommentReactionTypeEnum | null;
  // Remove button (the comment's is_can_react)
  isCanReact: boolean;
  onRemove: () => void;
  isRemoving: boolean;
};
