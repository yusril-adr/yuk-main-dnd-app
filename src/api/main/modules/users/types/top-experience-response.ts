import type { TPublicUserPaginationResponse } from "./public-user-pagination-response";

// Up to 3 users, ranked by net EXP (income − expense) in the range.
// Users whose net is 0 or less are left out, so gained_* is always positive.
export type TTopDmExperienceResponse = TPublicUserPaginationResponse & {
  gained_dm_exp: number;
};

export type TTopPlayerExperienceResponse = TPublicUserPaginationResponse & {
  gained_player_exp: number;
};
