import { useQuery } from "@tanstack/react-query";

import { getUserById } from "@/api/main/modules/master/iam/users/[id]";
import CONFIG from "@/common/constants/config";

export function useGetUserById(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL(), id],
    queryFn: () => getUserById(id),
    enabled: options?.enabled ?? !!id,
  });
}