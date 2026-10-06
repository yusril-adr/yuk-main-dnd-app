import type { TBaseEntity } from "../base-entity";
import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

export type TStoryCreatorEntity = {
  id: string;
  display_name: string;
  avatar_url?: string | null;
};

export type TStoryEntity = TBaseEntity & {
  title: string;
  slug: string;
  description: string | null;
  status: StoryStatusEnum;
  type: StoryTypeEnum;
  game_system: string | null;
  // Rewards for completing the story (API default 0, never null)
  exp_awarded: number;
  point_awarded: number;
  max_members: number | null;
  start_at: string | null;
  location_type: StoryLocationTypeEnum;
  location_detail: string;
  banner_url: string | null;
  created_by?: TStoryCreatorEntity;
};
