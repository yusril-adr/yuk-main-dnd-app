import type { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import type { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import type { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

export type TStoryCreatePayload = {
  title: string;
  description?: string;
  status?: StoryStatusEnum;
  type: StoryTypeEnum;
  game_system?: string;
  // The API only accepts 1 for now and defaults to 1 when omitted
  exp_awarded?: number;
  // Whole number >= 0; the API defaults to 0 when omitted
  point_awarded?: number;
  max_members?: number;
  // ISO 8601 datetime string
  start_at?: string;
  location_type: StoryLocationTypeEnum;
  location_detail: string;
  // https only; Discord hosts only for discord_channel_link (max 255)
  location_link?: string;
  discord_channel_link?: string;
  banner_file_id?: string;
};
