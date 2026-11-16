import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";

export type TPublicEventCommentReactButtonProps = {
  // "comment" or "reply", for the aria labels
  noun: string;
  isReply: boolean;
  onReact: (type: EventCommentReactionTypeEnum) => void;
};
