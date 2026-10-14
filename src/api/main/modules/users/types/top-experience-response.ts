import type { TPublicUserPaginationResponse } from "./public-user-pagination-response";

// Up to 3 users, ranked by exp gained in the range
export type TTopDmExperienceResponse = TPublicUserPaginationResponse & {
  gained_dm_exp: number;
};

export type TTopPlayerExperienceResponse = TPublicUserPaginationResponse & {
  gained_player_exp: number;
};
