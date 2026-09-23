import type { TMainApiPaginationPayload } from "@/api/main/types/pagination-payload";
import type { TPermissionSortBy } from "@/api/main/modules/master/iam/permissions/consts/permission-sort-by";
import { PermissionModuleEnum } from "@/api/main/modules/master/iam/permissions/enums/permission-module";
import { PermissionActionEnum } from "@/api/main/modules/master/iam/permissions/enums/permission-action";

export type TPermissionPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TPermissionSortBy;
  module?: PermissionModuleEnum;
  action?: PermissionActionEnum;
};
