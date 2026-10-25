import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";

export type TPublicStoryDetailActionList = {
  // Only true for a logged-in non-member on a published story. The creator
  // can join their own story too.
  is_can_join: boolean;
  is_can_cancel_join: boolean;
};

export type TPublicStoryDetailResponse = TStoryEntity & {
  action_list: TPublicStoryDetailActionList;
};
