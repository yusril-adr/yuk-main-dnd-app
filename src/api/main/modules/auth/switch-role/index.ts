import { type AxiosResponse } from "axios";
import type { TUserMeResponse } from "@/api/main/modules/auth/me/types/user-me-response";
import MAIN_API_PATH from "@/api/main/_const/path";
import type { TMainApiResponse } from "@/api/main/types/response";
import { mainAxios } from "@/api/main/_libs/axios";
import { TSwitchRolePayload } from "./types/switch-role-payload";

export const authSwitchRole = async (payload: TSwitchRolePayload) => {
  const response: AxiosResponse<TMainApiResponse<TUserMeResponse>> =
    await mainAxios.post(MAIN_API_PATH.AUTH.SWITCH_ROLE, payload);

  return response;
};
