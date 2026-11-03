import type { TPublicUserPaginationResponse } from "@/api/main/modules/users/types/public-user-pagination-response";

export type TPublicLegendEntry = {
  rank: number;
  user: TPublicUserPaginationResponse;
  gainedExp: number;
};
