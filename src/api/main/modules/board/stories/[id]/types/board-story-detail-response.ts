import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { TBoardStoryCreator } from "../../types/board-story-creator";

// No member status or member count here; members come from /:id/members
export type TBoardStoryDetailResponse = Omit<TStoryEntity, "created_by"> & {
  status_before: StoryStatusEnum | null;
  created_by?: TBoardStoryCreator;
  action_list: {
    is_can_view_public: boolean;
  };
};
