import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import { TBaseEntity } from "../base-entity";

export type TStoryMemberUserEntity = {
  id: string;
  display_name: string;
  username?: string | null;
  avatar_url: string | null;
};

export type TStoryMemberEntity = TBaseEntity & {
  user: TStoryMemberUserEntity;
  status: StoryMemberStatusEnum;
};
