import { useMemo } from "react";

import {
  RICH_TEXT_CONTENT_CLASS_NAME,
  RICH_TEXT_MENTION_CLASS_NAME,
} from "@/app/_constants/rich-text";
import type { TRichTextContentProps } from "@/app/_types/rich-text-content-props";
import { cn } from "cn";
import {
  renderCommentMarkdown,
  renderRichTextMarkdown,
} from "@/utils/rich-text";

// Read-only view of stored Markdown, rendered to HTML and sanitized before it
// reaches the DOM.
export default function RichTextContent({
  value,
  className,
  variant = "default",
  highlightLeadingMention = false,
}: TRichTextContentProps) {
  const html = useMemo(
    () =>
      variant === "comment"
        ? renderCommentMarkdown(
            value,
            highlightLeadingMention ? RICH_TEXT_MENTION_CLASS_NAME : undefined,
          )
        : renderRichTextMarkdown(value),
    [value, variant, highlightLeadingMention],
  );

  return (
    <div
      className={cn(RICH_TEXT_CONTENT_CLASS_NAME, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
