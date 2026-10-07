import { mainAxios } from "@/api/main/_libs/axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import type { TUpdateProfilePayload } from "./types/update-profile-payload";

export const updateProfile = async (payload: TUpdateProfilePayload) => {
  return mainAxios.patch(MAIN_API_PATH.AUTH.PROFILE, payload);
};
