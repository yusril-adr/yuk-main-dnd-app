import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";
import type { TRoleCreatePayload } from "@/api/main/modules/master/iam/roles/types/role-create-payload";

export type TRoleFormValues = {
  name: string;
  description: string;
  permissionIds: string[];
};

export type TRoleFormProps = {
  initialValues?: Partial<TRoleFormValues>;
  permissions: TPermissionResponse[];
  isLoading: boolean;
  isPermissionsLoading: boolean;
  onSubmitPayload: (payload: TRoleCreatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
};
