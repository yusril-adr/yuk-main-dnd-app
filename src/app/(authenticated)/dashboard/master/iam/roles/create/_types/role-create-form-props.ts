import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";
import type { TRoleCreatePayload } from "@/api/main/modules/master/iam/roles/types/role-create-payload";

export type TRoleCreateFormProps = {
  permissions: TPermissionResponse[];
  isPermissionsLoading: boolean;
  onSubmitPayload: (payload: TRoleCreatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
};
