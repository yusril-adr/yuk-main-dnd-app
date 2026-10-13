import { useMemo } from "react";

import { RICH_TEXT_CONTENT_CLASS_NAME } from "@/app/_constants/rich-text";
import type { TRichTextContentProps } from "@/app/_types/rich-text-content-props";
import { cn } from "@/utils/cn";
import { renderRichTextMarkdown } from "@/utils/rich-text";

// Read-only view of stored Markdown, rendered to HTML and sanitized before it
// reaches the DOM.
export default function RichTextContent({
  value,
  className,
}: TRichTextContentProps) {
  const html = useMemo(() => renderRichTextMarkdown(value), [value]);

  return (
    <div
      className={cn(RICH_TEXT_CONTENT_CLASS_NAME, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
