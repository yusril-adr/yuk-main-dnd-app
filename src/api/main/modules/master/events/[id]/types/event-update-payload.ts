import type { TEventCreatePayload } from "@/api/main/modules/master/events/types/event-create-payload";

// Optional columns the API clears when they are sent as null.
// exp_awarded / point_awarded are NOT NULL in the DB: never send null
type TEventClearableField =
  | "description"
  | "max_members"
  | "start_at"
  | "banner_file_id"
  | "location_link"
  | "feedback_form_link";

export type TEventUpdatePayload = Partial<
  Omit<TEventCreatePayload, TEventClearableField | "status">
> & {
  [K in TEventClearableField]?: TEventCreatePayload[K] | null;
};
