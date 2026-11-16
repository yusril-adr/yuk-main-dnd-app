import type { TEventCreatePayload } from "@/api/main/modules/master/events/types/event-create-payload";

// The create API only accepts DRAFT or PUBLISHED
export type TEventCreateStatus = NonNullable<TEventCreatePayload["status"]>;
