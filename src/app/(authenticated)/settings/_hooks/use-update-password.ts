import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updatePassword } from "@/api/main/modules/auth/password";
import type { TUpdatePasswordPayload } from "@/api/main/modules/auth/password/types/update-password-payload";
import { useT } from "@/app/_hooks/use-t";

import { SETTINGS_MESSAGES } from "../_messages";

export function useUpdatePassword(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TUpdatePasswordPayload>,
    "mutationFn"
  >,
) {
  const { t } = useT(SETTINGS_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: updatePassword,
    onMutate: (...args) => {
      toast.loading(t("toast.updatingPassword"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.passwordUpdated"));
      options?.onSuccess?.(...args);
    },
  });
}
