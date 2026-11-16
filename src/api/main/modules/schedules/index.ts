import type { AxiosResponse } from "axios";

import MAIN_API_PATH from "@/api/main/_const/path";
import { mainAxios } from "@/api/main/_libs/axios";
import type { TMainApiListResponse } from "@/api/main/types/response";
import type { TPublicScheduleItem } from "./types/public-schedule-item";
import type { TPublicScheduleListPayload } from "./types/public-schedule-list-payload";

// Public endpoint, no auth needed (the token is still sent when logged in)
export const getPublicSchedules = async (
  payload: TPublicScheduleListPayload,
): Promise<AxiosResponse<TMainApiListResponse<TPublicScheduleItem>>> => {
  const response = await mainAxios.get(MAIN_API_PATH.SCHEDULE.DEFAULT, {
    params: {
      start: payload.start,
      end: payload.end,
      type: payload.type?.join(","),
    },
  });

  return response;
};
