import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateUserById } from "@/api/main/modules/master/iam/users/[id]";
import type { TUserUpdatePayload } from "@/api/main/modules/master/iam/users/[id]/types/user-update-payload";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_USERS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/_messages/shared";

export function useUpdateUserById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TUserUpdatePayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_USERS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: updateUserById,
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
