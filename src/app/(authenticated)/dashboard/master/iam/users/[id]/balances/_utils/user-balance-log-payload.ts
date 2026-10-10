export type TUserBalanceLogQuery = {
  page: number;
  pageSize: number;
  search: string;
  type: number | null;
};

export type TUserBalanceLogPayload = {
  page: number;
  per_page: number;
  search?: string;
  type?: number;
};

// Search under 3 characters is a table rule, not a backend rule.
// Omit it so a short URL value is not sent. Omit null type so the API
// default applies: created_at desc, no type filter.
export function toUserBalanceLogPayload(
  query: TUserBalanceLogQuery,
): TUserBalanceLogPayload {
  return {
    page: query.page,
    per_page: query.pageSize,
    ...(query.search.length >= 3 ? { search: query.search } : {}),
    ...(query.type != null ? { type: query.type } : {}),
  };
}
