import type { TStoryCreatePayload } from "@/api/main/modules/master/stories/types/story-create-payload";

// Optional columns the API clears when they are sent as null.
// point_awarded is NOT NULL in the DB: never send null
type TStoryClearableField =
  | "description"
  | "game_system"
  | "max_members"
  | "start_at"
  | "banner_file_id"
  | "location_link"
  | "discord_channel_link";

export type TStoryUpdatePayload = Partial<
  Omit<TStoryCreatePayload, TStoryClearableField | "status">
> & {
  [K in TStoryClearableField]?: TStoryCreatePayload[K] | null;
};
