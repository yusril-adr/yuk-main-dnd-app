import type { UseQueryResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { TUserMeResponse } from "@/api/requestor/auth/me/types/user-me-response";
import type { TMainApiResponse } from "@/api/requestor/types/response";

export type TAuthProviderState = {
  auth: TUserMeResponse | null;
  authQuery: UseQueryResult<
    NoInfer<
      AxiosResponse<
        TMainApiResponse<TUserMeResponse>,
        unknown,
        Record<string, unknown>
      >
    >,
    Error
  > | null;
};
