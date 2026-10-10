import { StoryMemberStatusEnum } from "./story-member-status";

export const STORY_MEMBER_STATUS_LABEL: Record<StoryMemberStatusEnum, string> = {
  [StoryMemberStatusEnum.REGISTERED]: "Registered",
  [StoryMemberStatusEnum.ABSENT]: "Absent",
  [StoryMemberStatusEnum.ATTENDED]: "Attended",
};
