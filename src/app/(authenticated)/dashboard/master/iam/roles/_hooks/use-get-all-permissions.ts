import { useQuery } from "@tanstack/react-query";

import { getAllPermissions } from "@/api/main/modules/master/iam/permissions";
import type { TPermissionFullListPayload } from "@/api/main/modules/master/iam/permissions/types/permission-full-list-payload";
import CONFIG from "@/common/constants/config";

export function useGetAllPermissions(
  payload: TPermissionFullListPayload = {},
) {
  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.PERMISSION.ALL(),
      payload,
    ],
    queryFn: () => getAllPermissions(payload),
  });
}
