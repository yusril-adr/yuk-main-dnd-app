import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { EventCommentReactionTypeEnum } from "../enums/event-comment-reaction-type";

// Order is fixed by the API (newest first). per_page max 100. Without type,
// every reaction is listed
export type TEventCommentReactionPaginationPayload = Pick<
  TMainApiPaginationPayload,
  "page" | "per_page"
> & {
  type?: EventCommentReactionTypeEnum;
};
