import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TMyPointPaginationPayload } from "./types/my-point-pagination-payload";
import type { TMyPointPaginationResponse } from "./types/my-point-pagination-response";

export const getMyPointPagination = async (
  payload: TMyPointPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TMyPointPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.AUTH.ME_POINTS, {
    params: payload,
  });
  return response;
};
