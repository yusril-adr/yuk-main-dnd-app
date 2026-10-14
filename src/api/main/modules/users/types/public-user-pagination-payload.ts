import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

// The public list has a fixed order (DM exp, then player exp), so no sorting
export type TPublicUserPaginationPayload = Omit<
  TMainApiPaginationPayload,
  "sort_by" | "order"
>;
