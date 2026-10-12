import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import { TBaseEntity } from "../base-entity";
import { TUserEntity } from "../iam/user-entity";

export type TStoryMemberEntity = TBaseEntity & {
  user: TUserEntity;
  status: StoryMemberStatusEnum;
};
