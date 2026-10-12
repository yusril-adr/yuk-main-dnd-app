import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";

export type TStoryDetailResponse = TStoryEntity & {
  status_before: StoryStatusEnum | null;
};
