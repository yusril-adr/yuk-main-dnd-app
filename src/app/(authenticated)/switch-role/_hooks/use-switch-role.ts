import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { switchRole } from "@/api/main/modules/auth/switch-role";
import { authMe } from "@/api/main/modules/auth/me";
import type { TSwitchRolePayload } from "@/api/main/modules/auth/switch-role/types/switch-role-payload";
import type { TSwitchRoleResponse } from "@/api/main/modules/auth/switch-role/types/switch-role-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import AccessToken from "@/libs/cookies/access-token";
import CONFIG from "@/common/constants/config";

export function useSwitchRole(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TMainApiResponse<TSwitchRoleResponse>>,
      Error,
      TSwitchRolePayload
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: switchRole,
    onMutate: (...args) => {
      toast.loading("Switching role...");
      options?.onMutate?.(...args);
    },
    onSuccess: async (data, ...args) => {
      const responseData = data.data.data;
      AccessToken.set(responseData.access_token);

      toast.dismiss();
      toast.success("Role switched successfully");
      await queryClient.fetchQuery({
        queryKey: CONFIG.QUERY_KEY.MAIN_API.AUTH.ME(),
        queryFn: authMe,
      });
      options?.onSuccess?.(data, ...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
  });
}
