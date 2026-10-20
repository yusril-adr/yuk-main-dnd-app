import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updatePassword } from "@/api/main/modules/auth/password";
import type { TUpdatePasswordPayload } from "@/api/main/modules/auth/password/types/update-password-payload";

export function useUpdatePassword(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TUpdatePasswordPayload>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: updatePassword,
    onMutate: (...args) => {
      toast.loading("Updating password...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Password updated");
      options?.onSuccess?.(...args);
    },
  });
}
