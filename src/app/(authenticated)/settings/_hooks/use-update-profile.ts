import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateProfile } from "@/api/main/modules/auth/profile";
import type { TUpdateProfilePayload } from "@/api/main/modules/auth/profile/types/update-profile-payload";
import { useT } from "@/app/_hooks/use-t";

import { SETTINGS_MESSAGES } from "../_messages";

export function useUpdateProfile(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TUpdateProfilePayload>,
    "mutationFn"
  >,
) {
  const { t } = useT(SETTINGS_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: updateProfile,
    onMutate: (...args) => {
      toast.loading(t("toast.updatingProfile"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.profileUpdated"));
      options?.onSuccess?.(...args);
    },
  });
}
