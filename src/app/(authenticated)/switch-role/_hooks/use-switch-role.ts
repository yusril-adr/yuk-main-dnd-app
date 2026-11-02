import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { switchRole } from "@/api/main/modules/auth/switch-role";
import type { TSwitchRolePayload } from "@/api/main/modules/auth/switch-role/types/switch-role-payload";
import type { TSwitchRoleResponse } from "@/api/main/modules/auth/switch-role/types/switch-role-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import AccessToken from "@/libs/cookies/access-token";
import { useT } from "@/app/_hooks/use-t";
import { SWITCH_ROLE_MESSAGES } from "@/app/(authenticated)/switch-role/_messages";

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
  const { t } = useT(SWITCH_ROLE_MESSAGES);

  return useMutation({
    mutationFn: switchRole,
    onMutate: (...args) => {
      toast.loading(t("toast.switching"));
      options?.onMutate?.(...args);
    },
    onSuccess: async (data, ...args) => {
      const responseData = data.data.data;
      AccessToken.set(responseData.access_token);

      toast.dismiss();
      toast.success(t("toast.success"));
      await options?.onSuccess?.(data, ...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
  });
}
