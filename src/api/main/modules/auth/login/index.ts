import { type AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import type { TMainApiResponse } from "@/api/main/types/response";
import { mainAxios } from "@/api/main/_libs/axios";

import type { TLoginPayload } from "@/api/main/modules/auth/login/types/login-payload";
import type { TLoginResponse } from "@/api/main/modules/auth/login/types/login-response";

export const login = async (payload: TLoginPayload) => {
  const response: AxiosResponse<TMainApiResponse<TLoginResponse>> =
    await mainAxios.post(MAIN_API_PATH.AUTH.LOGIN, payload);

  return response;
};
