import { useQuery } from "@tanstack/react-query";

import { getRoleById } from "@/api/main/modules/master/iam/roles/[id]";
import CONFIG from "@/common/constants/config";

export function useGetRoleById(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL(), id],
    queryFn: () => getRoleById(id),
    enabled: options?.enabled ?? !!id,
  });
}
