import type { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import type { TStoryMemberUserEntity } from "@/api/main/types/entities/story/story-member-user";

export type TStoryMemberResponse = {
  id: string;
  status: StoryMemberStatusEnum;
  created_at: string;
  user: TStoryMemberUserEntity;
};
