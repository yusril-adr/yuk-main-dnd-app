import type { TEventCommentPaginationResponse } from "@/api/main/modules/events/[id]/comments/types/event-comment-pagination-response";

export type TPublicEventCommentRepliesProps = {
  eventId: string;
  // Top-level comment that owns the thread
  comment: TEventCommentPaginationResponse;
  // Logged in and the event accepts comments (event action_list)
  isCanReply: boolean;
};
