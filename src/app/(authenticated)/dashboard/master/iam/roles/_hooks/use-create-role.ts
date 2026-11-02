import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createRole } from "@/api/main/modules/master/iam/roles";
import type { TRoleCreatePayload } from "@/api/main/modules/master/iam/roles/types/role-create-payload";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_ROLES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/roles/_messages/shared";

export function useCreateRole(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TRoleCreatePayload>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_ROLES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: createRole,
    onMutate: (...args) => {
      toast.loading(t("toast.creating"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.created"));
      options?.onSuccess?.(...args);
    },
  });
}
