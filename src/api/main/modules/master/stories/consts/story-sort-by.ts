import type { TStoryPaginationResponse } from "../types/story-pagination-response";

export type TStorySortBy = Exclude<
  keyof TStoryPaginationResponse,
  "created_by" | "status_before"
>;
