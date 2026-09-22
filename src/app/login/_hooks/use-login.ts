import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { login } from "@/api/requestor/auth/login";
import { authMe } from "@/api/requestor/auth/me";
import type { TLoginPayload } from "@/api/requestor/auth/login/types/login-payload";
import type { TLoginResponse } from "@/api/requestor/auth/login/types/login-response";
import type { TRequestorApiResponse } from "@/api/requestor/types/response";
import AccessToken from "@/libs/cookies/access-token";
import CONFIG from "@/common/constants/config";

export function useLogin(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TRequestorApiResponse<TLoginResponse>>,
      Error,
      TLoginPayload
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onMutate: (...args) => {
      toast.loading("Logging in...");
      options?.onMutate?.(...args);
    },
    onSuccess: (data, ...args) => {
      const responseData = data.data.data;
      AccessToken.set(responseData.access_token);

      toast.dismiss();
      toast.success("Login Success");
      queryClient.fetchQuery({
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
