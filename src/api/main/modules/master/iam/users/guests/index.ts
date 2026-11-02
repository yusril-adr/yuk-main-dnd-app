import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TUserDetailResponse } from "@/api/main/modules/master/iam/users/[id]/types/user-detail-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import type { TGuestUserCreatePayload } from "./types/guest-user-create-payload";

export const createGuestUser = async (
  payload: TGuestUserCreatePayload,
): Promise<AxiosResponse<TMainApiResponse<TUserDetailResponse>>> => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.IAM.USER.GUESTS,
    payload,
  );

  return response;
};
