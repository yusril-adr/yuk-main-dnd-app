import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";

export type TPublicEventCommentReactorListProps = {
  eventId: string;
  commentId: string;
  // undefined lists every type (the All tab)
  type?: EventCommentReactionTypeEnum;
  // The comment's my_reaction: pinned "You" row on All and on its own tab
  myReaction: EventCommentReactionTypeEnum | null;
  // The comment's is_can_react: your own row gets a Remove button
  isCanReact: boolean;
  onRemove: () => void;
  isRemoving: boolean;
};
