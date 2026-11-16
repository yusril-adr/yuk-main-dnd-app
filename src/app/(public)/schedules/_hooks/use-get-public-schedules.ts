import { useQuery } from "@tanstack/react-query";

import { getPublicSchedules } from "@/api/main/modules/schedules";
import type { TPublicScheduleListPayload } from "@/api/main/modules/schedules/types/public-schedule-list-payload";
import CONFIG from "@/common/constants/config";

export function useGetPublicSchedules(
  payload: TPublicScheduleListPayload | null,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.SCHEDULE.ALL(), payload],
    queryFn: () => {
      if (!payload) {
        return Promise.reject(new Error("Missing schedule range"));
      }
      return getPublicSchedules(payload);
    },
    enabled: payload !== null,
  });
}
