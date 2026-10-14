import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TUserPointSortBy } from "@/api/main/modules/master/iam/users/[id]/points/consts/user-point-sort-by";
import type { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";

// Omitting sort_by uses created_at. Omitting order uses desc.
export type TMyPointPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TUserPointSortBy;
  type?: UserPointLogTypeEnum;
};
