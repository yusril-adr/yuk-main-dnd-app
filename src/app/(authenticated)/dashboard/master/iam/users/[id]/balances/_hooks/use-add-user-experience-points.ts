import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { addUserExperiencePoints } from "@/api/main/modules/master/iam/users/[id]/experience-points";
import type { TAddUserExperiencePointsPayload } from "@/api/main/modules/master/iam/users/[id]/experience-points/types/add-user-experience-points-payload";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_USERS_BALANCES_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/balances/_messages";

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
  const { t } = useT(MASTER_USERS_BALANCES_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: addUserExperiencePoints,
    onMutate: (...args) => {
      toast.loading(t("toast.addingExp"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.expAdded"));
      options?.onSuccess?.(...args);
    },
  });
}
