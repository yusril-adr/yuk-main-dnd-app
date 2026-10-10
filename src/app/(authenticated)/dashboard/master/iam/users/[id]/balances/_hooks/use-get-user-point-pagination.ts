import { useQuery } from "@tanstack/react-query";

import { getUserPointPagination } from "@/api/main/modules/master/iam/users/[id]/points";
import type { UserPointLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/points/enums/user-point-log-type";
import CONFIG from "@/common/constants/config";
import type { TUserBalanceLogPayload } from "../_utils/user-balance-log-payload";

export function useGetUserPointPagination(
  id: string,
  payload: TUserBalanceLogPayload,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL(),
      id,
      "points",
      payload,
    ],
    queryFn: () =>
      getUserPointPagination({
        id,
        payload: {
          ...payload,
          type: payload.type as UserPointLogTypeEnum | undefined,
        },
      }),
    enabled: options?.enabled ?? !!id,
  });
}
