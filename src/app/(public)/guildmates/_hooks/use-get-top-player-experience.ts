import { useQuery } from "@tanstack/react-query";

import { getTopPlayerExperience } from "@/api/main/modules/users";
import type { TTopExperiencePayload } from "@/api/main/modules/users/types/top-experience-payload";
import CONFIG from "@/common/constants/config";

export function useGetTopPlayerExperience(payload: TTopExperiencePayload | null) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.TOP_PLAYER(), payload],
    queryFn: () => getTopPlayerExperience(payload!),
    // null until the client knows today's UTC date
    enabled: !!payload,
  });
}
