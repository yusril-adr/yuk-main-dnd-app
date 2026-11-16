import type { TAvailableEventUserPaginationResponse } from "@/api/main/modules/master/events/[id]/available-users/types/available-event-user-pagination-response";

export type TEventDetailAddMemberRowProps = {
  user: TAvailableEventUserPaginationResponse;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (userId: string, checked: boolean) => void;
};
