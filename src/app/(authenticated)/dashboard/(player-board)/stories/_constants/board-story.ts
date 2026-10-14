import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

export const BOARD_STORY_PAGE_SIZE = 12;

export const BOARD_STORY_FILTER_ALL = "all";

// Shown in the browser's local time
export const BOARD_STORY_DATE_FORMAT = "D MMM YYYY, HH:mm";
export const BOARD_STORY_START_AT_FORMAT = "ddd, D MMM YYYY · HH:mm";

// Draft stories cannot have members, so they are left out
export const BOARD_STORY_STATUS_OPTIONS = [
  StoryStatusEnum.PUBLISHED,
  StoryStatusEnum.COMPLETED,
  StoryStatusEnum.CANCELLED,
  StoryStatusEnum.ARCHIVED,
] as const;

export const BOARD_STORY_MEMBER_STATUS_OPTIONS = [
  StoryMemberStatusEnum.REGISTERED,
  StoryMemberStatusEnum.VIEWER,
  StoryMemberStatusEnum.ATTENDED,
] as const;

// Solid, low-key badge styles (no gradients)
export const BOARD_STORY_STATUS_CLASS: Record<StoryStatusEnum, string> = {
  [StoryStatusEnum.DRAFT]: "border-border bg-muted text-foreground/80",
  [StoryStatusEnum.PUBLISHED]: "border-primary/40 bg-primary/10 text-primary",
  [StoryStatusEnum.COMPLETED]:
    "border-emerald-700/40 bg-emerald-700/10 text-emerald-800 dark:text-emerald-300",
  [StoryStatusEnum.CANCELLED]:
    "border-destructive/40 bg-destructive/10 text-destructive",
  [StoryStatusEnum.ARCHIVED]: "border-border bg-muted text-foreground/70",
};

export const BOARD_STORY_MEMBER_STATUS_CLASS: Record<
  StoryMemberStatusEnum,
  string
> = {
  [StoryMemberStatusEnum.REGISTERED]: "border-primary/40 bg-card text-primary",
  [StoryMemberStatusEnum.VIEWER]: "border-border bg-card text-foreground/80",
  [StoryMemberStatusEnum.ATTENDED]:
    "border-emerald-700/40 bg-card text-emerald-800 dark:text-emerald-300",
};
