import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";

export type TRoleEditPermissionChecboxInputProps = {
  permissions: TPermissionResponse[];
  value: string[];
  onChange: (permissionIds: string[]) => void;
  disabled: boolean;
};
