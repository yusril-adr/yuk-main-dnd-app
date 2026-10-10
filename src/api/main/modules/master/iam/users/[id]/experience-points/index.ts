import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TAddUserExperiencePointsPayload } from "./types/add-user-experience-points-payload";
import type { TUserExperiencePointPaginationPayload } from "./types/user-experience-point-pagination-payload";
import type { TUserExperiencePointResponse } from "./types/user-experience-point-response";

export const addUserExperiencePoints = async ({
  id,
  payload,
}: {
  id: string;
  payload: TAddUserExperiencePointsPayload;
}) => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.IAM.USER.EXPERIENCE_POINTS(id),
    payload,
  );
  return response;
};

export const getUserExperiencePointPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TUserExperiencePointPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TUserExperiencePointResponse>>
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.IAM.USER.EXPERIENCE_POINTS(id),
    { params: payload },
  );
  return response;
};
