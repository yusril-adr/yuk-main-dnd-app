import type { TPermissionOptionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-options-response";
import type { TRoleCreatePayload } from "@/api/main/modules/master/iam/roles/types/role-create-payload";

export type TRoleCreateFormProps = {
  permissions: TPermissionOptionResponse[];
  isPermissionsLoading: boolean;
  onSubmitPayload: (payload: TRoleCreatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
};
