import type { TAvailableStoryUserResponse } from "@/api/main/modules/master/stories/[id]/available-users/types/available-story-user-response";

export type TStoryDetailAddMemberRowProps = {
  user: TAvailableStoryUserResponse;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (userId: string, checked: boolean) => void;
};
