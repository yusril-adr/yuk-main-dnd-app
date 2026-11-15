import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";
import type { TBoardEventDetailResponse } from "./types/board-event-detail-response";
import type { TBoardEventMemberPaginationPayload } from "./types/board-event-member-pagination-payload";
import type { TBoardEventMemberPaginationResponse } from "./types/board-event-member-pagination-response";

// Needs PLAYER_BOARD_VIEW; 404 unless the caller is a member of the event
export const getBoardEventById = async (id: string) => {
  const response: AxiosResponse<TMainApiResponse<TBoardEventDetailResponse>> =
    await mainAxios.get(MAIN_API_PATH.BOARD.EVENT.DETAIL(id));

  return response;
};

// Same 404 rule as the detail
export const getBoardEventMemberPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TBoardEventMemberPaginationPayload;
}): Promise<
  AxiosResponse<TMainApiPaginationResponse<TBoardEventMemberPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.BOARD.EVENT.MEMBERS(id), {
    params: payload,
  });

  return response;
};
