import type { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import type { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";

// JSON body (no multipart): upload the banner with uploadFile first and send
// its id. Wire keys are snake_case; the API converts them
export type TEventCreatePayload = {
  // Max 150, not blank
  title: string;
  description?: string | null;
  // Only DRAFT (API default) or PUBLISHED
  status?: EventStatusEnum.DRAFT | EventStatusEnum.PUBLISHED;
  // Whole numbers >= 0; exp_awarded defaults to 1 (null is read as 0),
  // point_awarded to 0 (never send null)
  exp_awarded?: number | null;
  point_awarded?: number;
  // >= 1
  max_members?: number | null;
  // ISO 8601 datetime string
  start_at?: string | null;
  location_type: EventLocationTypeEnum;
  location_detail: string;
  // https only, max 255
  location_link?: string | null;
  feedback_form_link?: string | null;
  banner_file_id?: string | null;
};
