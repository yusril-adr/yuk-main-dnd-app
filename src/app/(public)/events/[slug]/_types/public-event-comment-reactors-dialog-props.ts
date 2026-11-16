import type { TEventCommentPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-pagination-response";
import type { TEventCommentReplyPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-reply-pagination-response";
import type { TPublicEventCommentReactorsTab } from "./public-event-comment-reactors-tab";

export type TPublicEventCommentReactorsDialogProps = {
  eventId: string;
  comment:
    TEventCommentPaginationResponse | TEventCommentReplyPaginationResponse;
  noun: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: TPublicEventCommentReactorsTab;
  onTabChange: (tab: TPublicEventCommentReactorsTab) => void;
  // Removes the caller's reaction (the Remove button on their own row,
  // shown only while comment.action_list.is_can_react)
  onRemove: () => void;
  isRemoving: boolean;
};
