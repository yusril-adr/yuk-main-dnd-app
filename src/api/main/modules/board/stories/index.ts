import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TBoardStoryPaginationPayload } from "./types/board-story-pagination-payload";
import type { TBoardStoryPaginationResponse } from "./types/board-story-pagination-response";

// Needs PLAYER_BOARD_VIEW; returns only stories the caller has joined
export const getBoardStoryPagination = async (
  payload: TBoardStoryPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TBoardStoryPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.BOARD.STORY.DEFAULT, {
    params: payload,
  });

  return response;
};
