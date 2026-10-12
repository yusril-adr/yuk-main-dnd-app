import type { TPermissionPaginationResponse } from "@/api/main/modules/master/iam/permissions/types/permission-pagination-response";
import type { TRoleCreatePayload } from "@/api/main/modules/master/iam/roles/types/role-create-payload";

export type TRoleCreateFormProps = {
  permissions: TPermissionPaginationResponse[];
  isPermissionsLoading: boolean;
  onSubmitPayload: (payload: TRoleCreatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
};
