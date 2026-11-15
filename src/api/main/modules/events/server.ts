import MAIN_API_PATH from "@/api/main/_const/path";
import { mainServerGet } from "@/api/main/_libs/server-fetch";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";

import type { TPublicEventDetailResponse } from "./[id]/types/public-event-detail-response";
import type { TPublicEventPaginationPayload } from "./types/public-event-pagination-payload";
import type { TPublicEventPaginationResponse } from "./types/public-event-pagination-response";

// Server-side (metadata, sitemap). Null when missing, not public or unreachable
export const getPublicEventByIdentifierOnServer = async (
  identifier: string,
) => {
  const response = await mainServerGet<
    TMainApiResponse<TPublicEventDetailResponse>
  >(MAIN_API_PATH.EVENT.DETAIL(encodeURIComponent(identifier)));
  return response?.data ?? null;
};

export const getPublicEventPaginationOnServer = async (
  payload: TPublicEventPaginationPayload,
) =>
  mainServerGet<TMainApiPaginationResponse<TPublicEventPaginationResponse>>(
    MAIN_API_PATH.EVENT.DEFAULT,
    { params: payload },
  );
