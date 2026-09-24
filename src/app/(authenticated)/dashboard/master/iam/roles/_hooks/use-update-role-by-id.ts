import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { updateRoleById } from "@/api/main/modules/master/iam/roles/[id]";
import type { TRoleUpdatePayload } from "@/api/main/modules/master/iam/roles/[id]/types/role-update-payload";
import CONFIG from "@/common/constants/config";

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
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL()],
      });
      options?.onSuccess?.(...args);
    },
  });
}
