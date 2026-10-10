import type { OrderKeyEnum } from "@/common/enums/order-key";
import type { TUserBalanceLogSortBy } from "../_types/user-balance-log-sort-by";

export type TUserBalanceLogQuery = {
  page: number;
  pageSize: number;
  search: string;
  sortBy: TUserBalanceLogSortBy | null;
  order: OrderKeyEnum | null;
  type: number | null;
};

export type TUserBalanceLogPayload = {
  page: number;
  per_page: number;
  search?: string;
  sort_by?: TUserBalanceLogSortBy;
  order?: OrderKeyEnum;
  type?: number;
};

// Search under 3 characters is a table rule, not a backend rule.
// Omit it so a short URL value is not sent. Omit null sort, order, and type
// so the API defaults apply: created_at desc, no type filter.
export function toUserBalanceLogPayload(
  query: TUserBalanceLogQuery,
): TUserBalanceLogPayload {
  return {
    page: query.page,
    per_page: query.pageSize,
    ...(query.search.length >= 3 ? { search: query.search } : {}),
    ...(query.sortBy ? { sort_by: query.sortBy } : {}),
    ...(query.order ? { order: query.order } : {}),
    ...(query.type != null ? { type: query.type } : {}),
  };
}
