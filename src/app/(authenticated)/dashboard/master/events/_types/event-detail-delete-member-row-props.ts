import type { TEventMemberPaginationResponse } from "@/api/main/modules/master/events/[id]/members/types/event-member-pagination-response";

export type TEventDetailDeleteMemberRowProps = {
  member: TEventMemberPaginationResponse;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (userId: string, checked: boolean) => void;
  statusLabel?: string;
};
