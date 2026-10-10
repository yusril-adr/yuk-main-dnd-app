import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { addUserPoints } from "@/api/main/modules/master/iam/users/[id]/points";
import type { TAddUserPointsPayload } from "@/api/main/modules/master/iam/users/[id]/points/types/add-user-points-payload";

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
  return useMutation({
    ...options,
    mutationFn: addUserPoints,
    onMutate: (...args) => {
      toast.loading("Adding gold pieces...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Gold pieces added");
      options?.onSuccess?.(...args);
    },
  });
}
