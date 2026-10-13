import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";

// Public list items: no rewards, location detail or updated_at; adds the
// current member count. Only published and completed stories are returned.
export type TPublicStoryPaginationResponse = Omit<
  TStoryEntity,
  "exp_awarded" | "point_awarded" | "location_detail" | "updated_at"
> & {
  joined_members: number;
};
