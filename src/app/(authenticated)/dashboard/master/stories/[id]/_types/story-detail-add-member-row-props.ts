import type { TAvailableStoryUserPaginationResponse } from "@/api/main/modules/master/stories/[id]/available-users/types/available-story-user-pagination-response";

export type TStoryDetailAddMemberRowProps = {
  user: TAvailableStoryUserPaginationResponse;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (userId: string, checked: boolean) => void;
};
