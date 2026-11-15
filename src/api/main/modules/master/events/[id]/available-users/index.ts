import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TAvailableEventUserPaginationPayload } from "./types/available-event-user-pagination-payload";
import type { TAvailableEventUserPaginationResponse } from "./types/available-event-user-pagination-response";

// Needs events:view. Users who can still be added to the event
export const getAvailableEventUserPagination = async ({
  id,
  payload,
}: {
  id: string;
  payload: TAvailableEventUserPaginationPayload;
}): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TAvailableEventUserPaginationResponse>
  >
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.MASTER.EVENT.AVAILABLE_USERS(id),
    { params: payload },
  );
  return response;
};
