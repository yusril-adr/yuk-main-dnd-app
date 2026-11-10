import type { TBaseEntity } from "../base-entity";
import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import type { TEventCreator } from "./event-creator";

// Like a story without type, game_system or discord_channel_link
export type TEventEntity = TBaseEntity & {
  title: string;
  slug: string;
  description: string | null;
  status: EventStatusEnum;
  // Rewards for attending (API default exp 1, points 0, never null)
  exp_awarded: number;
  point_awarded: number;
  max_members: number | null;
  start_at: string | null;
  location_type: EventLocationTypeEnum;
  location_detail: string;
  // Optional https links (null when not set)
  location_link: string | null;
  feedback_form_link: string | null;
  banner_url: string | null;
  created_by?: TEventCreator;
};
