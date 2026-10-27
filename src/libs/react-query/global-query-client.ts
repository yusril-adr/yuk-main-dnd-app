import CONFIG from "@/common/constants/config";
import ApiError from "@/common/errors/api-error";
import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

// A 4xx (not found, forbidden, invalid) won't fix itself on retry;
// anything else (network, 5xx) gets one more try
function shouldRetryQuery(failureCount: number, error: unknown) {
  if (error instanceof ApiError) return false;

  const status = isAxiosError(error) ? error.response?.status : undefined;
  if (status && status >= 400 && status < 500) return false;

  return failureCount < 1;
}

export const globalQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CONFIG.REACT_QUERY_STALE_IN_MS,
      retry: shouldRetryQuery,
    },
  },
});
