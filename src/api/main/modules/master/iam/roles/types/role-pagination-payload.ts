import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import { TRoleSortBy } from "@/api/main/modules/master/iam/roles/consts/role-sort-by";

export type TRolePaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TRoleSortBy;
  is_show_in_public?: boolean;
};
