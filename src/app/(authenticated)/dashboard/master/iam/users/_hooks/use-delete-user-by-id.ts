import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteUserById } from "@/api/main/modules/master/iam/users/[id]";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_USERS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/_messages/shared";

export function useDeleteUserById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_USERS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: deleteUserById,
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
