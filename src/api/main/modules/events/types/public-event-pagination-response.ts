import type { TEventEntity } from "@/api/main/types/entities/event/event-entity";
import type { TEventCreator } from "@/api/main/types/entities/event/event-creator";

// Public list items: no rewards, location detail or updated_at; adds the
// current member count. Only published and completed events are returned.
export type TPublicEventPaginationResponse = Omit<
  TEventEntity,
  | "exp_awarded"
  | "point_awarded"
  | "location_detail"
  | "updated_at"
  | "created_by"
> & {
  joined_members: number;
  created_by?: Omit<TEventCreator, "username">;
};
