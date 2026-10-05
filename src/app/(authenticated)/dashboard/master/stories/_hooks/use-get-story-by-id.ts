import { useQuery } from "@tanstack/react-query";

import { getStoryById } from "@/api/main/modules/master/stories/[id]";
import CONFIG from "@/common/constants/config";

export function useGetStoryById(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.STORY.ALL(), id],
    queryFn: () => getStoryById(id),
    enabled: options?.enabled ?? !!id,
  });
}
