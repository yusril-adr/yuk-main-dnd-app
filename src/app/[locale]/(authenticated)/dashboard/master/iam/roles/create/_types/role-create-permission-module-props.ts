import type { TPermissionOptionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-options-response";

export type TRoleCreatePermissionModuleProps = {
  module: string;
  permissions: TPermissionOptionResponse[];
  selectedPermissionIds: string[];
  onPermissionChange: (permissionIds: string[]) => void;
  disabled: boolean;
};
