import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

export const PUBLIC_STORY_MEMBER_PAGE_SIZE = 12;

// Medieval wording for the member status
export const PUBLIC_STORY_MEMBER_STATUS_LABEL: Record<
  StoryMemberStatusEnum,
  string
> = {
  [StoryMemberStatusEnum.REGISTERED]: "Enlisted",
  [StoryMemberStatusEnum.ATTENDED]: "Attended",
  [StoryMemberStatusEnum.ABSENT]: "Absent",
};
