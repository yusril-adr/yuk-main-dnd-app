import type { AxiosResponse } from "axios";
import type { TStoryUpdatePayload } from "./types/story-update-payload";
import type { TMainApiResponse } from "@/api/main/types/response";
import type { TStoryResponse } from "../types/story-response";
import { mainAxios } from "@/api/main/_libs/axios";
import MAIN_API_PATH from "@/api/main/_const/path";

export const getStoryById = async (id: string) => {
  const response: AxiosResponse<TMainApiResponse<TStoryResponse>> =
    await mainAxios.get(MAIN_API_PATH.MASTER.STORY.DETAIL(id));

  return response;
};

export const updateStoryById = async ({
  id,
  payload,
}: {
  id: string;
  payload: TStoryUpdatePayload;
}) => {
  const response = await mainAxios.patch(
    MAIN_API_PATH.MASTER.STORY.DETAIL(id),
    payload,
  );
  return response;
};

export const deleteStoryById = async (id: string) => {
  const response = await mainAxios.delete(
    MAIN_API_PATH.MASTER.STORY.DETAIL(id),
  );

  return response;
};
