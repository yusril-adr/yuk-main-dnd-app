import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createUser } from "@/api/main/modules/master/iam/users";
import type { TUserCreatePayload } from "@/api/main/modules/master/iam/users/types/user-create-payload";
import { useT } from "@/app/_hooks/use-t";
import { MASTER_USERS_SHARED_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/_messages/shared";

export function useCreateUser(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TUserCreatePayload>,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_USERS_SHARED_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: createUser,
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
