import { useQuery } from "@tanstack/react-query";

import { getMyExperiencePointPagination } from "@/api/main/modules/auth/me/experience-points";
import type { TMyExperiencePointPaginationPayload } from "@/api/main/modules/auth/me/experience-points/types/my-experience-point-pagination-payload";
import CONFIG from "@/common/constants/config";

export function useGetMyExperiencePointPagination(
  payload: TMyExperiencePointPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.AUTH.ME_EXPERIENCE_POINTS(), payload],
    queryFn: () => getMyExperiencePointPagination(payload),
  });
}
