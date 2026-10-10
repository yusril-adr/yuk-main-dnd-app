import { useQuery } from "@tanstack/react-query";

import { getUserExperiencePointPagination } from "@/api/main/modules/master/iam/users/[id]/experience-points";
import type { UserExpLogTypeEnum } from "@/api/main/modules/master/iam/users/[id]/experience-points/enums/user-exp-log-type";
import CONFIG from "@/common/constants/config";
import type { TUserBalanceLogPayload } from "../_utils/user-balance-log-payload";

export function useGetUserExperiencePointPagination(
  id: string,
  payload: TUserBalanceLogPayload,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: [
      CONFIG.QUERY_KEY.MAIN_API.MASTER.IAM.USER.ALL(),
      id,
      "experience-points",
      payload,
    ],
    queryFn: () =>
      getUserExperiencePointPagination({
        id,
        payload: {
          ...payload,
          type: payload.type as UserExpLogTypeEnum | undefined,
        },
      }),
    enabled: options?.enabled ?? !!id,
  });
}
