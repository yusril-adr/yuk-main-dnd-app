import { useQuery } from "@tanstack/react-query";

import { getPublicUserByIdentifier } from "@/api/main/modules/users";
import CONFIG from "@/common/constants/config";

export function useGetPublicGuildmateByIdentifier(
  // Username or user id
  identifier: string,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.USER.DETAIL(), identifier],
    queryFn: () => getPublicUserByIdentifier(identifier),
    enabled: !!identifier,
  });
}
