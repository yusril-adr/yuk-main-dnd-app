import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";
import type { TEventPaginationPayload } from "./types/event-pagination-payload";
import type { TEventPaginationResponse } from "./types/event-pagination-response";
import type { TEventCreatePayload } from "./types/event-create-payload";

// Needs events:create. 201 with data null (no id back)
export const createEvent = async (
  payload: TEventCreatePayload,
): Promise<AxiosResponse<TMainApiResponse<null>>> => {
  const response = await mainAxios.post(
    MAIN_API_PATH.MASTER.EVENT.DEFAULT,
    payload,
  );

  return response;
};

// Needs events:view
export const getEventPagination = async (
  payload: TEventPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TEventPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.MASTER.EVENT.DEFAULT, {
    params: payload,
  });

  return response;
};
