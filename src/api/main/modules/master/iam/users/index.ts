import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TUserCreatePayload } from "./types/user-create-payload";
import type { TUserPaginationPayload } from "./types/user-pagination-payload";
import type { TUserResponse } from "./types/user-response";

export const createUser = async (payload: TUserCreatePayload) => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.IAM.USER.DEFAULT,
    payload,
  );

  return response;
};

export const getUserPagination = async (
  payload: TUserPaginationPayload,
): Promise<AxiosResponse<TMainApiPaginationResponse<TUserResponse>>> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.USER.DEFAULT,
    {
      params: payload,
    },
  );

  return response;
};
