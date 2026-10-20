import { useQuery } from "@tanstack/react-query";

import { getPermissionOptions } from "@/api/main/modules/master/iam/permissions";
import type { TPermissionOptionsPayload } from "@/api/main/modules/master/iam/permissions/types/permission-options-payload";
import CONFIG from "@/common/constants/config";

export function useGetPermissionOptions(
  payload: TPermissionOptionsPayload = {},
) {
  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.PERMISSION.ALL(),
      "options",
      payload,
    ],
    queryFn: () => getPermissionOptions(payload),
  });
}
