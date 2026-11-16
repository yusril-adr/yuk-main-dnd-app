import * as z from "zod";

import { getRichTextPlainText } from "@/utils/rich-text";
import { getApiStringLength } from "@/utils/validation-helper";
import { PUBLIC_EVENT_COMMENT_MAX_LENGTH } from "@/app/(public)/events/[slug]/_constants/public-event-comment";

// What is sent for the editor's Markdown (also what the counter counts)
export function toPublicEventCommentContent(value: string) {
  return value.trimEnd();
}

// content is the Markdown string sent to the API, trailing blank lines and
// spaces dropped (meaningless in Markdown). Mirrors the API's @Matches(/\S/) +
// @MaxLength(1000), which count the raw Markdown (syntax included). Also
// rejects Markdown with no visible text (e.g. an empty list)
export const PublicEventCommentFormSchema = z.object({
  content: z
    .string()
    .overwrite(toPublicEventCommentContent)
    .refine(
      (value) => /\S/.test(value) && getRichTextPlainText(value).length > 0,
      "Write something before posting",
    )
    .refine(
      (value) => getApiStringLength(value) <= PUBLIC_EVENT_COMMENT_MAX_LENGTH,
      `Comment must be at most ${PUBLIC_EVENT_COMMENT_MAX_LENGTH} characters, formatting included`,
    ),
});

export type TPublicEventCommentFormSchema = z.infer<
  typeof PublicEventCommentFormSchema
>;
