import MAIN_API_PATH from "@/api/main/_const/path";
import { mainServerGet } from "@/api/main/_libs/server-fetch";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";

import type { TPublicUserDetailResponse } from "./types/public-user-detail-response";
import type { TPublicUserPaginationPayload } from "./types/public-user-pagination-payload";
import type { TPublicUserPaginationResponse } from "./types/public-user-pagination-response";

// Server-side (metadata, sitemap). Null when missing or unreachable
export const getPublicUserByIdentifierOnServer = async (identifier: string) => {
  const response = await mainServerGet<
    TMainApiResponse<TPublicUserDetailResponse>
  >(MAIN_API_PATH.USER.DETAIL(identifier));
  return response?.data ?? null;
};

export const getPublicUserPaginationOnServer = async (
  payload: TPublicUserPaginationPayload,
) =>
  mainServerGet<TMainApiPaginationResponse<TPublicUserPaginationResponse>>(
    MAIN_API_PATH.USER.DEFAULT,
    { params: payload },
  );
