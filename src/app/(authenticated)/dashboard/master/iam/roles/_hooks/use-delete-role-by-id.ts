import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { deleteRoleById } from "@/api/main/modules/master/iam/roles/[id]";
import CONFIG from "@/common/constants/config";

export function useDeleteRoleById(
  options?: Omit<
    UseMutationOptions<AxiosResponse, Error, string>,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({
        queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL()],
      });
      options?.onSuccess?.(...args);
    },
  });
}
