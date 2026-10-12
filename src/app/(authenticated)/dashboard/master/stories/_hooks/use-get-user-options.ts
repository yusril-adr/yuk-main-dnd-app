import { useQuery } from "@tanstack/react-query";

import { getUserOptions } from "@/api/main/modules/master/iam/users";
import type { TUserOptionsPayload } from "@/api/main/modules/master/iam/users/types/user-options-payload";
import { OrderKeyEnum } from "@/common/enums/order-key";
import CONFIG from "@/common/constants/config";

export function useGetUserOptions(
  search?: string,
  options?: { enabled?: boolean },
) {
  const payload: TUserOptionsPayload = {
    page: 1,
    per_page: 10,
    search,
    sort_by: "display_name",
    order: OrderKeyEnum.ASC,
  };

  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL(),
      "options",
      payload,
    ],
    queryFn: () => getUserOptions(payload),
    enabled: options?.enabled ?? true,
  });
}
