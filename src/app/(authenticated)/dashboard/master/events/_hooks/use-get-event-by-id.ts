import { useQuery } from "@tanstack/react-query";

import { getEventById } from "@/api/main/modules/master/events/[id]";
import CONFIG from "@/common/constants/config";

export function useGetEventById(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.EVENT.ALL(), id],
    queryFn: () => getEventById(id),
    enabled: options?.enabled ?? !!id,
  });
}
