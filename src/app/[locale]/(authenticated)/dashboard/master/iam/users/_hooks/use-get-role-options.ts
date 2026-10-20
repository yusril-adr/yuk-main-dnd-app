import { useQuery } from "@tanstack/react-query";

import { getRoleOptions } from "@/api/main/modules/master/iam/roles";
import type { TRoleOptionsPayload } from "@/api/main/modules/master/iam/roles/types/role-options-payload";
import { OrderKeyEnum } from "@/common/enums/order-key";
import CONFIG from "@/common/constants/config";

export function useGetRoleOptions(search?: string) {
  const payload: TRoleOptionsPayload = {
    page: 1,
    per_page: 10,
    search,
    sort_by: "name",
    order: OrderKeyEnum.ASC,
  };

  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.ROLE.ALL(),
      "options",
      payload,
    ],
    queryFn: () => getRoleOptions(payload),
  });
}
