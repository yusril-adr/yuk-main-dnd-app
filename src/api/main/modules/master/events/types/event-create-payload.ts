import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

// JSON body (no multipart): upload the banner with uploadFile first and send
// its id
export type TEventCreatePayload = {
  // Max 150, not blank
  title: string;
  description?: string;
  // Only DRAFT (API default) or PUBLISHED
  status?: EventStatusEnum.DRAFT | EventStatusEnum.PUBLISHED;
  // Whole numbers >= 0; when omitted the API defaults exp_awarded to 1 and point_awarded to 0
  exp_awarded?: number;
  point_awarded?: number;
  // >= 1
  max_members?: number;
  // ISO 8601 datetime string
  start_at?: string;
  location_type: EventLocationTypeEnum;
  location_detail: string;
  // https only, max 255
  location_link?: string;
  feedback_form_link?: string;
  banner_file_id?: string;
};
