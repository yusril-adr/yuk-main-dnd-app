import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TPublicStoryMemberPaginationPayload } from "./types/public-story-member-pagination-payload";
import type { TPublicStoryMemberPaginationResponse } from "./types/public-story-member-pagination-response";

// Public endpoint; 404 unless the story is published or completed
export const getPublicStoryMemberPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TPublicStoryMemberPaginationPayload;
}): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TPublicStoryMemberPaginationResponse>
  >
> => {
  const response = await mainAxios.get(MAIN_API_PATH.STORY.MEMBERS(id), {
    params: payload,
  });
  return response;
};
