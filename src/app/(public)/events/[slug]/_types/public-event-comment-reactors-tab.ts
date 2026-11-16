import type { EventCommentReactionTypeEnum } from "@/api/main/modules/events/[id]/comments/enums/event-comment-reaction-type";
import type { PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB } from "@/app/(public)/events/[slug]/_constants/public-event-comment-reaction";

// Who-reacted dialog tab: every reaction, or one type
export type TPublicEventCommentReactorsTab =
  typeof PUBLIC_EVENT_COMMENT_REACTORS_ALL_TAB | EventCommentReactionTypeEnum;
