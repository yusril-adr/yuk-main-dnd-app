import { useQuery } from "@tanstack/react-query";

import { getPublicStoryById } from "@/api/main/modules/stories/[id]";
import CONFIG from "@/common/constants/config";

export function useGetPublicStoryById(
  id: string,
  options?: { enabled?: boolean; userId?: string | null },
) {
  return useQuery({
    // action_list depends on the caller, so the viewer is part of the key
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.STORY.ALL(),
      id,
      options?.userId ?? null,
    ],
    queryFn: () => getPublicStoryById(id),
    enabled: options?.enabled ?? !!id,
  });
}
