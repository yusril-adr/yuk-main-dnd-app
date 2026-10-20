import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteRoleById } from "@/api/main/modules/master/iam/roles/[id]";

export function useDeleteRoleById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: deleteRoleById,
    onMutate: (...args) => {
      toast.loading("Deleting role...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Role deleted");
      options?.onSuccess?.(...args);
    },
  });
}
