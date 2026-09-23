import { type AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import type { TMainApiResponse } from "@/api/main/types/response";
import { mainAxios } from "@/api/main/_libs/axios";
import { TSwitchRolePayload } from "./types/switch-role-payload";
import { TSwitchRoleResponse } from "./types/switch-role-response";

export const switchRole = async (payload: TSwitchRolePayload) => {
  const response: AxiosResponse<TMainApiResponse<TSwitchRoleResponse>> =
    await mainAxios.post(MAIN_API_PATH.AUTH.SWITCH_ROLE, payload);

  return response;
};
