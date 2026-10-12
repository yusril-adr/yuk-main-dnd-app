import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TAddUserPointsPayload } from "./types/add-user-points-payload";
import type { TUserPointPaginationPayload } from "./types/user-point-pagination-payload";
import type { TUserPointPaginationResponse } from "./types/user-point-pagination-response";

export const addUserPoints = async ({
  id,
  payload,
}: {
  id: string;
  payload: TAddUserPointsPayload;
}) => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.IAM.USER.POINTS(id),
    payload,
  );
  return response;
};

export const getUserPointPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TUserPointPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TUserPointPaginationResponse>>
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.USER.POINTS(id),
    { params: payload },
  );
  return response;
};
