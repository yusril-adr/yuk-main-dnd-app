import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";
import type { TPublicEventPaginationPayload } from "./types/public-event-pagination-payload";
import type { TPublicEventPaginationResponse } from "./types/public-event-pagination-response";

// Public endpoint, no auth needed (the token is still sent when logged in)
export const getPublicEventPagination = async (
  payload: TPublicEventPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TPublicEventPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.EVENT.DEFAULT, {
    params: payload,
  });

  return response;
};
