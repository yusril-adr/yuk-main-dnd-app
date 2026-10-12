import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

export type TUserOptionsPayload = Omit<TMainApiPaginationPayload, "sort_by"> & {
  sort_by?: "display_name" | "username";
};
