import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

import { login } from "@/api/main/modules/auth/login";
import type { TLoginPayload } from "@/api/main/modules/auth/login/types/login-payload";
import type { TLoginResponse } from "@/api/main/modules/auth/login/types/login-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import AccessToken from "@/libs/cookies/access-token";
import { useT } from "@/app/_hooks/use-t";
import { LOGIN_MESSAGES } from "@/app/login/_messages";

export function useLogin(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TMainApiResponse<TLoginResponse>>,
      Error,
      TLoginPayload
    >,
    "mutationFn"
  >,
) {
  const { t } = useT(LOGIN_MESSAGES);

  return useMutation({
    mutationFn: login,
    onMutate: (...args) => {
      toast.loading(t("toast.loggingIn"));
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
