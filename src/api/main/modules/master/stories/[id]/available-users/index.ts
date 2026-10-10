import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TAvailableStoryUserPaginationPayload } from "./types/available-story-user-pagination-payload";
import type { TAvailableStoryUserResponse } from "./types/available-story-user-response";

export const getAvailableStoryUserPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TAvailableStoryUserPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TAvailableStoryUserResponse>>
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.STORY.AVAILABLE_USERS(id),
    { params: payload },
  );
  return response;
};
