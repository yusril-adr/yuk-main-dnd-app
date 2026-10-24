import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TUserExperiencePointSortBy } from "../consts/user-experience-point-sort-by";
import type { UserExpLogDirectionEnum } from "../enums/user-exp-log-direction";
import type { UserExpLogTypeEnum } from "../enums/user-exp-log-type";

// Omitting sort_by uses created_at. Omitting order uses desc.
// search matches description only.
export type TUserExperiencePointPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TUserExperiencePointSortBy;
  type?: UserExpLogTypeEnum;
  direction?: UserExpLogDirectionEnum;
};
