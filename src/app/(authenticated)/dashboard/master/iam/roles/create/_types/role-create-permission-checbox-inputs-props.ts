import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";

export type TRoleCreatePermissionChecboxInputsProps = {
  permissions: TPermissionResponse[];
  value: string[];
  onChange: (permissionIds: string[]) => void;
  disabled: boolean;
};
