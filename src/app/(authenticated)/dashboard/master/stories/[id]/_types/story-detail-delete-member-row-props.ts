import type { TStoryMemberPaginationResponse } from "@/api/main/modules/master/stories/[id]/members/types/story-member-pagination-response";

export type TStoryDetailDeleteMemberRowProps = {
  member: TStoryMemberPaginationResponse;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (userId: string, checked: boolean) => void;
};
