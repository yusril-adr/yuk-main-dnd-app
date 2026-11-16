import type { TPublicEventDetailResponse } from "@/api/main/modules/events/[id]/types/public-event-detail-response";

export type TPublicEventDetailProps = {
  event: TPublicEventDetailResponse;
  className?: string;
};
