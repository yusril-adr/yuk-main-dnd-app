import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";

export type TStoryDetailResponse = TStoryEntity & {
  status_before: StoryStatusEnum | null;
  action_list: {
    is_can_update: boolean;
    is_can_publish: boolean;
    is_can_cancel: boolean;
    is_can_archive: boolean;
    is_can_unarchive: boolean;
    is_can_delete: boolean;
    is_can_complete: boolean;
    is_can_add_members: boolean;
    is_can_remove_members: boolean;
    is_can_view_public: boolean;
  };
};
