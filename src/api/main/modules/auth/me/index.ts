import { type AxiosResponse } from "axios";
import type { TUserMeResponse } from "@/api/main/modules/auth/me/types/user-me-response";
import MAIN_API_PATH from "@/api/main/_const/path";
import type { TMainApiResponse } from "@/api/main/types/response";
import { mainAxios } from "@/api/main/_libs/axios";
import { makeDefaultAvatarUrl } from "@/utils/avatar-helper";

export const authMe = async () => {
  const response: AxiosResponse<TMainApiResponse<TUserMeResponse>> =
    await mainAxios.get(MAIN_API_PATH.AUTH.ME);

  if (!response.data?.data?.avatar?.url) {
    response.data.data.avatar = {
      url: makeDefaultAvatarUrl(response.data.data.display_name),
    };
  }

  return response;
};
