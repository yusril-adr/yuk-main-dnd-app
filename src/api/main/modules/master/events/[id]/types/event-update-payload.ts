import type { TEventCreatePayload } from "@/api/main/modules/master/events/types/event-create-payload";

// Every field optional; status is changed through the action endpoints.
// title, point_awarded, location_type and location_detail must not be null
export type TEventUpdatePayload = Partial<Omit<TEventCreatePayload, "status">>;
