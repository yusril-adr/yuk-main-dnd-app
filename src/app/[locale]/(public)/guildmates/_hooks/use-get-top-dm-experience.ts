import { useQuery } from "@tanstack/react-query";

import { getTopDmExperience } from "@/api/main/modules/users";
import type { TTopExperiencePayload } from "@/api/main/modules/users/types/top-experience-payload";
import CONFIG from "@/common/constants/config";

export function useGetTopDmExperience(payload: TTopExperiencePayload | null) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.TOP_DM(), payload],
    queryFn: () => getTopDmExperience(payload!),
    // null until the client knows today's UTC date
    enabled: !!payload,
  });
}
