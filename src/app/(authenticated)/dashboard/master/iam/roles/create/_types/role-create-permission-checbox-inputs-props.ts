import type { TPermissionPaginationResponse } from "@/api/main/modules/master/iam/permissions/types/permission-pagination-response";

export type TRoleCreatePermissionChecboxInputsProps = {
  permissions: TPermissionPaginationResponse[];
  value: string[];
  onChange: (permissionIds: string[]) => void;
  disabled: boolean;
};
