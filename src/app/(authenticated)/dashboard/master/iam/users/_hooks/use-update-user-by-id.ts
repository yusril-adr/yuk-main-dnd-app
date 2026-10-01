import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateUserById } from "@/api/main/modules/master/iam/users/[id]";
import type { TUserUpdatePayload } from "@/api/main/modules/master/iam/users/[id]/types/user-update-payload";

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
  return useMutation({
    ...options,
    mutationFn: updateUserById,
    onMutate: (...args) => {
      toast.loading("Updating user...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("User updated");
      options?.onSuccess?.(...args);
    },
  });
}