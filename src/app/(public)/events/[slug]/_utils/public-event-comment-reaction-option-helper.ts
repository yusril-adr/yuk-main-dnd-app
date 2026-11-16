import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";
import { PUBLIC_EVENT_COMMENT_REACTIONS } from "@/app/(public)/events/[slug]/_constants/public-event-comment-reaction";

// Emoji and count key of a reaction type
export function getPublicEventCommentReactionOption(
  type: EventCommentReactionTypeEnum,
) {
  return PUBLIC_EVENT_COMMENT_REACTIONS.find((option) => option.type === type);
}
