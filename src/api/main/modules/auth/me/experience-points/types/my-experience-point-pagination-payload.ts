import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TUserExperiencePointSortBy } from "@/api/main/modules/master/iam/users/[id]/experience-points/consts/user-experience-point-sort-by";
import type { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";

// Omitting sort_by uses created_at. Omitting order uses desc.
export type TMyExperiencePointPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TUserExperiencePointSortBy;
  type?: UserExpLogTypeEnum;
};
