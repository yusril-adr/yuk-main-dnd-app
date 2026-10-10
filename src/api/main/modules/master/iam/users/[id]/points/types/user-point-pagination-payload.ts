import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TUserPointSortBy } from "../consts/user-point-sort-by";
import type { UserPointLogTypeEnum } from "../enums/user-point-log-type";

// Omitting sort_by uses created_at. Omitting order uses desc.
// search matches description only.
export type TUserPointPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TUserPointSortBy;
  type?: UserPointLogTypeEnum;
};
