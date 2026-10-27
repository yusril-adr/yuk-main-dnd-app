import type { AxiosResponse } from "axios";
import type { TMainApiPaginationResponse } from "@/api/main/types/response";

// useInfiniteQuery getNextPageParam: next page number, or undefined on the last page
export function getMainApiNextPage<T>(
  lastPage: AxiosResponse<TMainApiPaginationResponse<T>>,
): number | undefined {
  const meta = lastPage.data?.data?.meta;
  if (!meta) return undefined;
  if (meta.current_page < meta.total_page) {
    return meta.current_page + 1;
  }
  return undefined;
}
