import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { TStoryListActionList } from "@/api/main/modules/master/stories/types/story-pagination-response";
import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";

export type TStoryDetailActionList = TStoryListActionList & {
  is_can_complete: boolean;
  is_can_add_members: boolean;
  is_can_remove_members: boolean;
};

export type TStoryDetailResponse = TStoryEntity & {
  status_before: StoryStatusEnum | null;
  action_list: TStoryDetailActionList;
};
