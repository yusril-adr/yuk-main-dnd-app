import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

// Members loaded per "Show more" batch
export const PUBLIC_STORY_MEMBER_PER_PAGE = 12;

// Medieval wording for the member status
export const PUBLIC_STORY_MEMBER_STATUS_LABEL: Record<
  StoryMemberStatusEnum,
  string
> = {
  [StoryMemberStatusEnum.REGISTERED]: "Enlisted",
  [StoryMemberStatusEnum.ATTENDED]: "Attended",
  [StoryMemberStatusEnum.VIEWER]: "Viewer",
};

// Badge variants per member status (Viewer adds a destructive outline tint)
export const PUBLIC_STORY_MEMBER_STATUS_BADGE_VARIANT: Record<
  StoryMemberStatusEnum,
  "default" | "secondary" | "outline"
> = {
  [StoryMemberStatusEnum.REGISTERED]: "secondary",
  [StoryMemberStatusEnum.ATTENDED]: "default",
  [StoryMemberStatusEnum.VIEWER]: "outline",
};
