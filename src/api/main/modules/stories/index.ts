import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TPublicStoryPaginationPayload } from "./types/public-story-pagination-payload";
import type { TPublicStoryPaginationResponse } from "./types/public-story-pagination-response";

// Public endpoint, no auth needed (the token is still sent when logged in)
export const getPublicStoryPagination = async (
  payload: TPublicStoryPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TPublicStoryPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.STORY.DEFAULT, {
    params: payload,
  });

  return response;
};
