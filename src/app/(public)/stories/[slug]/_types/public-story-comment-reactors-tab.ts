import type { StoryCommentReactionTypeEnum } from "@/api/main/modules/stories/[id]/comments/enums/story-comment-reaction-type";
import type { PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB } from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";

// Who-reacted dialog tab: every reaction, or one type
export type TPublicStoryCommentReactorsTab =
  typeof PUBLIC_STORY_COMMENT_REACTORS_ALL_TAB | StoryCommentReactionTypeEnum;
