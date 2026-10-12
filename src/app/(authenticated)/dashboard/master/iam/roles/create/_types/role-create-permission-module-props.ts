import type { TPermissionPaginationResponse } from "@/api/main/modules/master/iam/permissions/types/permission-pagination-response";

export type TRoleCreatePermissionModuleProps = {
  module: string;
  permissions: TPermissionPaginationResponse[];
  selectedPermissionIds: string[];
  onPermissionChange: (permissionIds: string[]) => void;
  disabled: boolean;
};
