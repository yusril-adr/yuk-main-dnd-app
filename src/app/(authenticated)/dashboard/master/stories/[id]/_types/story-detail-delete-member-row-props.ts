import type { TStoryMemberResponse } from "@/api/main/modules/master/stories/[id]/members/types/story-member-response";

export type TStoryDetailDeleteMemberRowProps = {
  member: TStoryMemberResponse;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (userId: string, checked: boolean) => void;
};
