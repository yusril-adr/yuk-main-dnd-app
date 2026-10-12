import type { TPermissionOptionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-options-response";

export type TRoleEditPermissionChecboxInputProps = {
  permissions: TPermissionOptionResponse[];
  value: string[];
  onChange: (permissionIds: string[]) => void;
  disabled: boolean;
};
