import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TStoryPaginationPayload } from "./types/story-pagination-payload";
import type { TStoryResponse } from "./types/story-response";
import type { TStoryCreatePayload } from "./types/story-create-payload";

export const createStory = async (payload: TStoryCreatePayload) => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.STORY.DEFAULT,
    payload,
  );

  return response;
};

export const getStoryPagination = async (
  payload: TStoryPaginationPayload,
): Promise<AxiosResponse<TMainApiPaginationResponse<TStoryResponse>>> => {
  const response = await mainAxios.get(MAIN_API_PATH.MASTER.STORY.DEFAULT, {
    params: payload,
  });

  return response;
};
