import * as z from "zod";

import { PUBLIC_STORY_COMMENT_MAX_LENGTH } from "@/app/(public)/stories/[slug]/_constants/public-story-comment";

// Mirrors the API: a string with at least one non-whitespace character, max
// 1000. The API stores it as typed (no trim), so neither do we
export const PublicStoryCommentFormSchema = z.object({
  content: z
    .string()
    .regex(/\S/, "Write something before posting")
    .max(
      PUBLIC_STORY_COMMENT_MAX_LENGTH,
      `Comment must be at most ${PUBLIC_STORY_COMMENT_MAX_LENGTH} characters`,
    ),
});

export type TPublicStoryCommentFormSchema = z.infer<
  typeof PublicStoryCommentFormSchema
>;
