import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { addUserPoints } from "@/api/main/modules/master/iam/users/[id]/points";
import type { TAddUserPointsPayload } from "@/api/main/modules/master/iam/users/[id]/points/types/add-user-points-payload";
import { useT } from "@/app/_hooks/use-t";

import { MASTER_USERS_BALANCES_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/balances/_messages";

export function useAddUserPoints(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TAddUserPointsPayload }
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(MASTER_USERS_BALANCES_MESSAGES);

  return useMutation({
    ...options,
    mutationFn: addUserPoints,
    onMutate: (...args) => {
      toast.loading(t("toast.addingGold"));
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success(t("toast.goldAdded"));
      options?.onSuccess?.(...args);
    },
  });
}
