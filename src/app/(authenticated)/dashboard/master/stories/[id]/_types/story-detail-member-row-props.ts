import type { TStoryMemberResponse } from "@/api/main/modules/master/stories/[id]/members/types/story-member-response";

export type TStoryDetailMemberRowProps = {
  member: TStoryMemberResponse;
  variant: "avatar" | "detail";
};
