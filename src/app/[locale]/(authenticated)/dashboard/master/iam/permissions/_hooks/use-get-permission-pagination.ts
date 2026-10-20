import { useQuery } from "@tanstack/react-query";
import { getPermissionPagination } from "@/api/main/modules/master/iam/permissions";
import CONFIG from "@/common/constants/config";
import type { TPermissionPaginationPayload } from "@/api/main/modules/master/iam/permissions/types/permission-pagination-payload";

export function useGetPermissionPagination(
  payload: TPermissionPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.PERMISSION.ALL(), payload],
    queryFn: () => getPermissionPagination(payload),
  });
}
