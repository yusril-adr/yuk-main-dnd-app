import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

// sort_by is any snake_case story member column except status (default
// updated_at); status desc is always applied first. search matches username,
// display_name and email.
export type TBoardStoryMemberPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: "created_at" | "updated_at";
};
