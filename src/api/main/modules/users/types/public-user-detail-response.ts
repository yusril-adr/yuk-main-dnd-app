import type { TPublicUserPaginationResponse } from "./public-user-pagination-response";

// Public guildmate detail; same shape as the list item plus bio and join date
export type TPublicUserDetailResponse = TPublicUserPaginationResponse & {
  bio: string | null;
  created_at: string;
};
