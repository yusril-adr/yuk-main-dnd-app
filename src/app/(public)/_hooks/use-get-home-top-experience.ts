import { useQuery } from "@tanstack/react-query";

import {
  getTopDmExperience,
  getTopPlayerExperience,
} from "@/api/main/modules/users";
import type { TTopExperiencePayload } from "@/api/main/modules/users/types/top-experience-payload";
import CONFIG from "@/common/constants/config";

// payload is null until the month range is known (client only); the range
// is part of the query key so each month is cached separately
export function useGetHomeTopPlayers(payload: TTopExperiencePayload | null) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.TOP_PLAYER(), payload],
    queryFn: () => getTopPlayerExperience(payload!),
    enabled: !!payload,
  });
}

export function useGetHomeTopDms(payload: TTopExperiencePayload | null) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.TOP_DM(), payload],
    queryFn: () => getTopDmExperience(payload!),
    enabled: !!payload,
  });
}
