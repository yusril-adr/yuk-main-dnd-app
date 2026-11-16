import type { TEventPaginationResponse } from "@/api/main/modules/master/events/types/event-pagination-response";

export type TEventCardProps = {
  event: TEventPaginationResponse;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onPublish?: (id: string) => void;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
};
