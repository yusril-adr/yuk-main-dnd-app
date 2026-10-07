import { mainAxios } from "@/api/main/_libs/axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import type { TUpdatePasswordPayload } from "./types/update-password-payload";

export const updatePassword = async (payload: TUpdatePasswordPayload) => {
  return mainAxios.patch(MAIN_API_PATH.AUTH.PASSWORD, payload);
};
