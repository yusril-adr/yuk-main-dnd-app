import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiResponse } from "@/api/main/types/response";
import type { TUserUpdatePayload } from "./types/user-update-payload";
import type { TUserResponse } from "../types/user-response";

export const getUserById = async (
  id: string,
): Promise<AxiosResponse<TMainApiResponse<TUserResponse>>> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.USER.DETAIL(id),
  );

  return response;
};

export const updateUserById = async ({
  id,
  payload,
}: {
  id: string;
  payload: TUserUpdatePayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.IAM.USER.DETAIL(id),
    payload,
  );

  return response;
};

export const deleteUserById = async (id: string) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.MASTER.IAM.USER.DETAIL(id),
  );

  return response;
};
