import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TBoardEventPaginationPayload } from "./types/board-event-pagination-payload";
import type { TBoardEventPaginationResponse } from "./types/board-event-pagination-response";

// Needs PLAYER_BOARD_VIEW; returns only events the caller has joined
export const getBoardEventPagination = async (
  payload: TBoardEventPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TBoardEventPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.BOARD.EVENT.DEFAULT, {
    params: payload,
  });

  return response;
};
