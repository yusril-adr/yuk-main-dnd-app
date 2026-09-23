import { type AxiosResponse } from "axios";
import type { TUserMeResponse } from "@/api/main/modules/auth/me/types/user-me-response";
import REQUESTOR_API_PATH from "@/api/main/_const/path";
import type { TMainApiResponse } from "@/api/main/types/response";
import { requestorAxios } from "@/api/main/_libs/axios";

export const authMe = async () => {
  const response: AxiosResponse<TMainApiResponse<TUserMeResponse>> =
    await requestorAxios.get(REQUESTOR_API_PATH.AUTH.ME);

  return response;
};
