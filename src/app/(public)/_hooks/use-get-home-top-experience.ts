import { useQuery } from "@tanstack/react-query";

import {
  getTopDmExperience,
  getTopPlayerExperience,
} from "@/api/main/modules/users";
import type { TTopExperiencePayload } from "@/api/main/modules/users/types/top-experience-payload";
import CONFIG from "@/common/constants/config";

export function useGetHomeTopPlayers(payload: TTopExperiencePayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.TOP_PLAYER(), payload],
    queryFn: () => getTopPlayerExperience(payload),
  });
}

export function useGetHomeTopDms(payload: TTopExperiencePayload) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.TOP_DM(), payload],
    queryFn: () => getTopDmExperience(payload),
  });
}
