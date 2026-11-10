import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

// sort_by is any snake_case event member column except status (default
// updated_at, order asc); status desc is always applied first. search
// matches username, display_name and email. No status filter
export type TBoardEventMemberPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: "id" | "created_at" | "updated_at";
};
