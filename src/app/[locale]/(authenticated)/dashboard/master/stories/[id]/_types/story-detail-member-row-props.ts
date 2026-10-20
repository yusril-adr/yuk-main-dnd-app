import type { TStoryMemberPaginationResponse } from "@/api/main/modules/master/stories/[id]/members/types/story-member-pagination-response";

export type TStoryDetailMemberRowProps = {
  member: TStoryMemberPaginationResponse;
  variant: "avatar" | "detail";
};
