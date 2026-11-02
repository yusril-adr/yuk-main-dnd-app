import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteRoleById } from "@/api/main/modules/master/iam/roles/[id]";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_ROLES_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/roles/_messages/shared";

export function useDeleteRoleById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_ROLES_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: deleteRoleById,
    onMutate: (...args) => {
      toast.loading(t("toast.deleting"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.deleted"));
      options?.onSuccess?.(...args);
    },
  });
}
