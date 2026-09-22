import { useQuery } from "@tanstack/react-query";
import { getPermissionPagination } from "@/api/main/modules/permissions";
import CONFIG from "@/common/constants/config";
import type { TPermissionPaginationPayload } from "@/api/main/modules/permissions/types/permission-pagination-payload";

export function useGetPermissionPagination(
  payload: TPermissionPaginationPayload,
) {
  return useQuery({
    queryKey: [CONFIG.QUERY_KEY.MAIN_API.PERMISSION.ALL(), payload],
    queryFn: () => getPermissionPagination(payload),
  });
}
