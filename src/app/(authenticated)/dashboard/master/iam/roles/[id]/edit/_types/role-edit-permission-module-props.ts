import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";

export type TRoleEditPermissionModuleProps = {
  module: string;
  permissions: TPermissionResponse[];
  selectedPermissionIds: string[];
  onPermissionChange: (permissionIds: string[]) => void;
  disabled: boolean;
};
