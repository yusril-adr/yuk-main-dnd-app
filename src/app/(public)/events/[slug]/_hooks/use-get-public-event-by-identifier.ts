import { useQuery } from "@tanstack/react-query";

import { getPublicEventByIdentifier } from "@/api/main/modules/events/[id]";
import CONFIG from "@/common/constants/config";

export function useGetPublicEventByIdentifier(
  // Event id (UUID) or slug
  identifier: string,
  options?: { enabled?: boolean; userId?: string | null },
) {
  return useQuery({
    // action_list depends on the caller, so the viewer is part of the key
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.EVENT.ALL(),
      identifier,
      options?.userId ?? null,
    ],
    queryFn: () => getPublicEventByIdentifier(identifier),
    enabled: options?.enabled ?? !!identifier,
  });
}
