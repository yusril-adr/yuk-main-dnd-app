import type { TPermissionResponse } from "@/api/main/modules/master/iam/permissions/types/permission-response";
import type { TRoleUpdatePayload } from "@/api/main/modules/master/iam/roles/[id]/types/role-update-payload";

export type TRoleEditFormProps = {
  name: string | undefined;
  description: string | undefined;
  isShowInPublic: boolean | undefined;
  permissionIds: string[] | undefined;
  permissions: TPermissionResponse[];
  isLoading: boolean;
  isPermissionsLoading: boolean;
  onSubmitPayload: (payload: TRoleUpdatePayload) => void;
  mutationError: Error | null;
  isPending: boolean;
  isPaused: boolean;
};
