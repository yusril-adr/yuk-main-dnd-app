import type { AxiosResponse } from "axios";
import type { TPublicEventDetailResponse } from "./types/public-event-detail-response";
import type { TMainApiResponse } from "@/api/main/types/response";
import { mainAxios } from "@/api/main/_libs/axios";
import MAIN_API_PATH from "@/api/main/_const/path";

// Public endpoint, optional auth (the token fills action_list); identifier is
// the event id (UUID) or its slug. 404 unless published or completed
export const getPublicEventByIdentifier = async (identifier: string) => {
  const response: AxiosResponse<TMainApiResponse<TPublicEventDetailResponse>> =
    await mainAxios.get(MAIN_API_PATH.EVENT.DETAIL(identifier));

  return response;
};

// Auth required. 404 unknown/not public; 400 not published; 409 already a
// member. Re-joining after cancel restores the row as registered. 201, data null
export const joinPublicEventById = async (id: string) => {
  const response = await mainAxios.post(MAIN_API_PATH.EVENT.JOIN(id));
  return response;
};

// Auth required. 404 unknown/not public or caller is not a member; 400 not
// published (completed events cannot be left)
export const cancelJoinPublicEventById = async (id: string) => {
  const response = await mainAxios.post(MAIN_API_PATH.EVENT.CANCEL_JOIN(id));
  return response;
};
