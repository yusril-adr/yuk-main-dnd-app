import { useQuery } from "@tanstack/react-query";

import { getPublicStoryByIdentifier } from "@/api/main/modules/stories/[id]";
import CONFIG from "@/common/constants/config";

export function useGetPublicStoryByIdentifier(
  // Story id (UUID) or slug
  identifier: string,
  options?: { enabled?: boolean; userId?: string | null },
) {
  return useQuery({
    // action_list depends on the caller, so the viewer is part of the key
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.STORY.ALL(),
      identifier,
      options?.userId ?? null,
    ],
    queryFn: () => getPublicStoryByIdentifier(identifier),
    enabled: options?.enabled ?? !!identifier,
  });
}
