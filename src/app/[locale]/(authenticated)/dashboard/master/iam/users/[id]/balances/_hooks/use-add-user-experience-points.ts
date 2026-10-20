import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { addUserExperiencePoints } from "@/api/main/modules/master/iam/users/[id]/experience-points";
import type { TAddUserExperiencePointsPayload } from "@/api/main/modules/master/iam/users/[id]/experience-points/types/add-user-experience-points-payload";

export function useAddUserExperiencePoints(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TAddUserExperiencePointsPayload }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: addUserExperiencePoints,
    onMutate: (...args) => {
      toast.loading("Adding experience points...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Experience points added");
      options?.onSuccess?.(...args);
    },
  });
}
