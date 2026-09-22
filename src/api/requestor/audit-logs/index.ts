import type { AxiosResponse } from "axios";
import { mainAxios } from "@/api/requestor/_libs/axios";
import MAIN_API_PATH from "@/api/requestor/_const/path";
import type { TRequestorApiPaginationResponse } from "@/api/requestor/types/response";

import type { TAuditLogPaginationPayload } from "@/api/requestor/audit-logs/types/audit-log-pagination-payload";
import type { TAuditLogResponse } from "@/api/requestor/audit-logs/types/audit-log-response";

export const getAuditLogPagination = async (
  payload: TAuditLogPaginationPayload,
) => {
  const response: AxiosResponse<
    TRequestorApiPaginationResponse<TAuditLogResponse>
  > = await mainAxios.get(MAIN_API_PATH.AUDIT_LOG.DEFAULT, {
    params: payload,
  });

  return response;
};
