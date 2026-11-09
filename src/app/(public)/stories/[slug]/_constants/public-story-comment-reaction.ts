import { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";
import type { TPublicStoryCommentReactionOption } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reaction-option";

// The API's fixed reaction set, in display order (chips and the picker)
export const PUBLIC_STORY_COMMENT_REACTIONS: readonly TPublicStoryCommentReactionOption[] =
  [
    {
      type: StoryCommentReactionTypeEnum.LIKE,
      countKey: "like",
      emoji: "👍",
      label: "Like",
    },
    {
      type: StoryCommentReactionTypeEnum.LOVE,
      countKey: "love",
      emoji: "❤️",
      label: "Love",
    },
    {
      type: StoryCommentReactionTypeEnum.LAUGH,
      countKey: "laugh",
      emoji: "😂",
      label: "Laugh",
    },
    {
      type: StoryCommentReactionTypeEnum.WOW,
      countKey: "wow",
      emoji: "😮",
      label: "Wow",
    },
  ];

// Message key of each type's name (chips, picker, who-reacted dialog)
export const PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY = {
  [StoryCommentReactionTypeEnum.LIKE]: "comments.reactionLike",
  [StoryCommentReactionTypeEnum.LOVE]: "comments.reactionLove",
  [StoryCommentReactionTypeEnum.LAUGH]: "comments.reactionLaugh",
  [StoryCommentReactionTypeEnum.WOW]: "comments.reactionWow",
} as const;

// Reactors loaded per batch in the who-reacted dialog (API max 100)
export const PUBLIC_STORY_COMMENT_REACTOR_PER_PAGE = 20;

// Tab of every reaction in the who-reacted dialog
export const PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB = "all";

// Reaction chip base. Replies: a step smaller, still a comfortable tap
// target. Light: a faint darkening of whatever card sits behind them
export const PUBLIC_STORY_COMMENT_REACTION_CHIP_CLASS_NAME =
  "gap-1 rounded-full border border-border/60 bg-foreground/5 px-2.5 tabular-nums shadow-none hover:bg-foreground/10 dark:border-foreground/10 dark:bg-popover dark:hover:bg-muted/50";
export const PUBLIC_STORY_COMMENT_REACTION_CHIP_REPLY_CLASS_NAME =
  "h-7 px-2 text-xs";

// Yours (chip and react button): a lighter fill (a primary tint mutes warm
// emoji skin) with the primary border as the signal
export const PUBLIC_STORY_COMMENT_REACTION_MINE_CLASS_NAME =
  "border-primary/70 bg-white/70 hover:bg-white/90 dark:border-primary dark:bg-primary/30 dark:hover:bg-primary/40";
