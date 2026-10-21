import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

// Members loaded per "Show more" batch
export const PUBLIC_STORY_MEMBER_PER_PAGE = 6;

// Badge variants per member status (Viewer adds a destructive outline tint)
export const PUBLIC_STORY_MEMBER_STATUS_BADGE_VARIANT: Record<
  StoryMemberStatusEnum,
  "default" | "secondary" | "outline"
> = {
  [StoryMemberStatusEnum.REGISTERED]: "secondary",
  [StoryMemberStatusEnum.ATTENDED]: "default",
  [StoryMemberStatusEnum.VIEWER]: "outline",
};
