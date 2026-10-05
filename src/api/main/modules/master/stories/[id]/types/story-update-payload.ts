import type { TStoryCreatePayload } from "@/api/main/modules/master/stories/types/story-create-payload";

// Optional columns the API clears when they are sent as null
type TStoryClearableField =
  | "description"
  | "game_system"
  | "max_members"
  | "start_at";

export type TStoryUpdatePayload = Partial<
  Omit<TStoryCreatePayload, TStoryClearableField>
> & {
  [K in TStoryClearableField]?: TStoryCreatePayload[K] | null;
};
