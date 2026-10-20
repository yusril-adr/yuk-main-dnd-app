import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateRoleById } from "@/api/main/modules/master/iam/roles/[id]";
import type { TRoleUpdatePayload } from "@/api/main/modules/master/iam/roles/[id]/types/role-update-payload";

export function useUpdateRoleById(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      { id: string; payload: TRoleUpdatePayload }
    >,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: updateRoleById,
    onMutate: (...args) => {
      toast.loading("Updating role...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Role updated");
      options?.onSuccess?.(...args);
    },
  });
}
