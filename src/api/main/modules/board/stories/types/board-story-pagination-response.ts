import type { TStoryEntity } from "@/api/main/types/entities/story/story-entity";
import type { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import type { TBoardStoryCreator } from "./board-story-creator";

// Stories the caller is a member of, with their own member status
export type TBoardStoryPaginationResponse = Omit<
  TStoryEntity,
  | "exp_awarded"
  | "point_awarded"
  | "location_detail"
  | "updated_at"
  | "created_by"
> & {
  joined_members: number;
  member_status: StoryMemberStatusEnum;
  created_by?: TBoardStoryCreator;
};
