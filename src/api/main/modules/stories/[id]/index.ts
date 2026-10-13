import type { AxiosResponse } from "axios";
import type { TPublicStoryDetailResponse } from "./types/public-story-detail-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import { mainAxios } from "@/api/main/_libs/axios";
import MAIN_API_PATH from "@/api/main/_const/path";

// Public endpoint; identifier is the story id (UUID) or its slug.
// 404 unless the story is published or completed
export const getPublicStoryByIdentifier = async (identifier: string) => {
  const response: AxiosResponse<TMainApiResponse<TPublicStoryDetailResponse>> =
    await mainAxios.get(MAIN_API_PATH.STORY.DETAIL(identifier));

  return response;
};

// Auth required. 404 unknown/not public; 400 not published or caller is the
// creator; 409 already a member. Re-joining after cancel restores the row.
export const joinPublicStoryById = async (id: string) => {
  const response = await mainAxios.post(MAIN_API_PATH.STORY.JOIN(id));
  return response;
};

// Auth required. 404 unknown/not public or caller is not a member; 400 not
// published (completed stories cannot be left)
export const cancelJoinPublicStoryById = async (id: string) => {
  const response = await mainAxios.post(MAIN_API_PATH.STORY.CANCEL_JOIN(id));
  return response;
};
