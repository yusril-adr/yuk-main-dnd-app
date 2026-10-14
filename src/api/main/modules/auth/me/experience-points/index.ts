import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TMyExperiencePointPaginationPayload } from "./types/my-experience-point-pagination-payload";
import type { TMyExperiencePointPaginationResponse } from "./types/my-experience-point-pagination-response";

export const getMyExperiencePointPagination = async (
  payload: TMyExperiencePointPaginationPayload,
): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TMyExperiencePointPaginationResponse>
  >
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.AUTH.ME_EXPERIENCE_POINTS,
    { params: payload },
  );
  return response;
};
