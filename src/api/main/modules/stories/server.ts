import MAIN_API_PATH from "@/api/main/_const/path";
import { mainServerGet } from "@/api/main/_libs/server-fetch";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";

import type { TPublicStoryDetailResponse } from "./[id]/types/public-story-detail-response";
import type { TPublicStoryPaginationPayload } from "./types/public-story-pagination-payload";
import type { TPublicStoryPaginationResponse } from "./types/public-story-pagination-response";

// Server-side (metadata, sitemap). Null when missing, not public or unreachable
export const getPublicStoryByIdentifierOnServer = async (
  identifier: string,
) => {
  const response = await mainServerGet<
    TMainApiResponse<TPublicStoryDetailResponse>
  >(MAIN_API_PATH.STORY.DETAIL(encodeURIComponent(identifier)));
  return response?.data ?? null;
};

export const getPublicStoryPaginationOnServer = async (
  payload: TPublicStoryPaginationPayload,
) =>
  mainServerGet<TMainApiPaginationResponse<TPublicStoryPaginationResponse>>(
    MAIN_API_PATH.STORY.DEFAULT,
    { params: payload },
  );
