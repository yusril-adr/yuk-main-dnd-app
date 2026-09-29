import type { TUserSortBy } from "@/api/main/modules/master/iam/users/consts/user-sort-by";
import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";

export type TUserPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TUserSortBy;
  role_ids?: string[];
};
