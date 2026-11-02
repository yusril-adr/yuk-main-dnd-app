import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateRoleById } from "@/api/main/modules/master/iam/roles/[id]";
import type { TRoleUpdatePayload } from "@/api/main/modules/master/iam/roles/[id]/types/role-update-payload";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_ROLES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/roles/_messages/shared";

export function useUpdateRoleById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TRoleUpdatePayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_ROLES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: updateRoleById,
    onMutate: (...args) => {
      toast.loading(t("toast.updating"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.updated"));
      options?.onSuccess?.(...args);
    },
  });
}
