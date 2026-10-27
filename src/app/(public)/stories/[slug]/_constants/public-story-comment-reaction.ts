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
