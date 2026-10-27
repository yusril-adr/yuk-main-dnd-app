import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

// Order is fixed by the API (pinned first, newest pin on top, then newest
// comments), so only page and per_page apply. per_page max 100.
export type TStoryCommentPaginationPayload = Pick<
  TMainApiPaginationPayload,
  "page" | "per_page"
>;
