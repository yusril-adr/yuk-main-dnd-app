import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";
import type { TEventCommentReactionUser } from "@/api/main/modules/events/[id]/comments/types/event-comment-reaction-user";

export type TPublicEventCommentReactorRowProps = {
  type: EventCommentReactionTypeEnum;
  user: TEventCommentReactionUser;
  // The logged-in user's own (pinned) row: "You" label
  isMine?: boolean;
  // Remove button on your own row (the comment's is_can_react)
  isCanRemove?: boolean;
  onRemove?: () => void;
  isRemoving?: boolean;
};
