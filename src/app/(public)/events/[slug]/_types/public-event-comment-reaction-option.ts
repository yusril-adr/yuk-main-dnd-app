import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";
import type { TEventCommentReactionCounts } from "@/api/main/modules/events/[id]/comments/types/event-comment-reaction-counts";

export type TPublicEventCommentReactionOption = {
  type: EventCommentReactionTypeEnum;
  // Key of the type in reaction_counts
  countKey: keyof TEventCommentReactionCounts;
  emoji: string;
  label: string;
};
