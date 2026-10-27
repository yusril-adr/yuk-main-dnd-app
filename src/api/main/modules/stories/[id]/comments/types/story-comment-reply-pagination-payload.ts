import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

// Order is fixed by the API (oldest first, id as tie-break), so only page and
// per_page apply. per_page max 100.
export type TStoryCommentReplyPaginationPayload = Pick<
  TMainApiPaginationPayload,
  "page" | "per_page"
>;
