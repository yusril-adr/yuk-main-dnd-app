import type { TEventDetailResponse } from "@/api/main/modules/master/events/[id]/types/event-detail-response";

export type TEventDetailCardProps = {
  event: TEventDetailResponse;
  className?: string;
};
