import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

export type TRoleOptionsPayload = Omit<TMainApiPaginationPayload, "sort_by"> & {
  sort_by?: "name";
};
