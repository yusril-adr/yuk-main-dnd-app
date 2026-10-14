import type { AxiosResponse } from "axios";
import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type {
  TMainApiPaginationResponse,
  TMainApiResponse,
} from "@/api/main/types/response";
import type { TPublicUserPaginationPayload } from "./types/public-user-pagination-payload";
import type { TPublicUserPaginationResponse } from "./types/public-user-pagination-response";
import type { TTopExperiencePayload } from "./types/top-experience-payload";
import type {
  TTopDmExperienceResponse,
  TTopPlayerExperienceResponse,
} from "./types/top-experience-response";
import type { TPublicUserDetailResponse } from "./types/public-user-detail-response";
import type { TPublicUserStoryPaginationPayload } from "./types/public-user-story-pagination-payload";
import type {
  TPublicUserCreatedStoryPaginationResponse,
  TPublicUserJoinedStoryPaginationResponse,
} from "./types/public-user-story-pagination-response";

// Public endpoints, no auth needed
export const getPublicUserPagination = async (
  payload: TPublicUserPaginationPayload,
): Promise<
  AxiosResponse<TMainApiPaginationResponse<TPublicUserPaginationResponse>>
> => {
  const response = await mainAxios.get(MAIN_API_PATH.USER.DEFAULT, {
    params: payload,
  });

  return response;
};

export const getTopDmExperience = async (
  payload: TTopExperiencePayload,
): Promise<AxiosResponse<TMainApiResponse<TTopDmExperienceResponse[]>>> => {
  const response = await mainAxios.get(MAIN_API_PATH.USER.TOP_DM_EXPERIENCE, {
    params: payload,
  });

  return response;
};

export const getTopPlayerExperience = async (
  payload: TTopExperiencePayload,
): Promise<AxiosResponse<TMainApiResponse<TTopPlayerExperienceResponse[]>>> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.USER.TOP_PLAYER_EXPERIENCE,
    { params: payload },
  );

  return response;
};

// identifier = username or user id
export const getPublicUserByIdentifier = async (
  identifier: string,
): Promise<AxiosResponse<TMainApiResponse<TPublicUserDetailResponse>>> => {
  const response = await mainAxios.get(MAIN_API_PATH.USER.DETAIL(identifier));

  return response;
};

export const getPublicUserCreatedStoryPagination = async (
  identifier: string,
  payload: TPublicUserStoryPaginationPayload,
): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TPublicUserCreatedStoryPaginationResponse>
  >
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.USER.CREATED_STORIES(identifier),
    { params: payload },
  );

  return response;
};

export const getPublicUserJoinedStoryPagination = async (
  identifier: string,
  payload: TPublicUserStoryPaginationPayload,
): Promise<
  AxiosResponse<
    TMainApiPaginationResponse<TPublicUserJoinedStoryPaginationResponse>
  >
> => {
  const response = await mainAxios.get(
    MAIN_API_PATH.USER.JOINED_STORIES(identifier),
    { params: payload },
  );

  return response;
};
