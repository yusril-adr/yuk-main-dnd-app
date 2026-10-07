import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateProfile } from "@/api/main/modules/auth/profile";
import type { TUpdateProfilePayload } from "@/api/main/modules/auth/profile/types/update-profile-payload";

export function useUpdateProfile(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TUpdateProfilePayload>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: updateProfile,
    onMutate: (...args) => {
      toast.loading("Updating profile...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Profile updated");
      options?.onSuccess?.(...args);
    },
  });
}
