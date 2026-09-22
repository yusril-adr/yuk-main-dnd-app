import type { TMainApiPaginationPayload } from "@/api/requestor/types/pagination-payload";
import type { TRequestSortBy } from "@/api/requestor/requests/consts/request-sort-by";
import type { RequestPriorityEnum } from "@/api/requestor/requests/enums/request-priority";
import type { RequestStatusEnum } from "@/api/requestor/requests/enums/request-status";

export type TRequestPaginationPayload = TMainApiPaginationPayload & {
  sort_by?: TRequestSortBy;
  priority?: RequestPriorityEnum;
  status?: RequestStatusEnum;
};
