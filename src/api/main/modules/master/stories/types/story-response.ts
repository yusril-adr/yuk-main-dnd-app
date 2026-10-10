import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";

// Master pagination items and master detail. Not on TStoryEntity.
export type TStoryResponse = TStoryEntity & {
  status_before: StoryStatusEnum | null;
};
