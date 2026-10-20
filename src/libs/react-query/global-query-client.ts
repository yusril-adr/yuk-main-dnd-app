import CONFIG from "@/common/constants/config";
import { QueryClient } from "@tanstack/react-query";

export const globalQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CONFIG.REACT_QUERY_STALE_IN_MS,
    },
  },
});
