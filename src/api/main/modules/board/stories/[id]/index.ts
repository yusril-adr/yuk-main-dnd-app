import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";
import type { TBoardStoryDetailResponse } from "./types/board-story-detail-response";
import type { TBoardStoryMemberPaginationPayload } from "./types/board-story-member-pagination-payload";
import type { TBoardStoryMemberPaginationResponse } from "./types/board-story-member-pagination-response";

// Needs PLAYER_BOARD_VIEW; 404 unless the caller is a member of the story
export const getBoardStoryById = async (id: string) => {
  const response: AxiosResponse<TMainApiResponse<TBoardStoryDetailResponse>> =
    await mainAxios.get(MAIN_API_PATH.BOARD.STORY.DETAIL(id));

  return response;
};

// Same 404 rule as the detail
export const getBoardStoryMemberPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TBoardStoryMemberPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TBoardStoryMemberPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.BOARD.STORY.MEMBERS(id), {
    params: payload,
  });

  return response;
};
