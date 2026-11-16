import type { TEventMemberPaginationResponse } from "@/api/main/modules/master/events/[id]/members/types/event-member-pagination-response";

export type TEventDetailMemberRowProps = {
  member: TEventMemberPaginationResponse;
  variant: "avatar" | "detail";
};
