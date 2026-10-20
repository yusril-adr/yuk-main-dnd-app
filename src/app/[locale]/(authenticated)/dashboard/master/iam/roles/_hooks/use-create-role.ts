import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { createRole } from "@/api/main/modules/master/iam/roles";
import type { TRoleCreatePayload } from "@/api/main/modules/master/iam/roles/types/role-create-payload";

export function useCreateRole(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, TRoleCreatePayload>,
    "mutationFn"
  >,
) {
  return useMutation({
    ...options,
    mutationFn: createRole,
    onMutate: (...args) => {
      toast.loading("Creating role...");
      options?.onMutate?.(...args);
    },
    onSuccess: (...args) => {
      toast.dismiss();
      toast.success("Role created");
      options?.onSuccess?.(...args);
    },
  });
}
