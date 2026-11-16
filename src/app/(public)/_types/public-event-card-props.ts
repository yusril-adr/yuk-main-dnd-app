import type { TPublicEventPaginationResponse } from "@/api/main/modules/events/types/public-event-pagination-response";

export type TPublicEventCardProps = {
  event: TPublicEventPaginationResponse;
  priority?: boolean;
};
