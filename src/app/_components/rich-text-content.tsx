import { useMemo } from "react";

import { RICH_TEXT_CONTENT_CLASS_NAME } from "@/app/_constants/rich-text";
import type { TRichTextContentProps } from "@/app/_types/rich-text-content-props";
import { cn } from "@/utils/cn";
import { sanitizeRichTextHtml, toRichTextHtml } from "@/utils/rich-text";

// Read-only view of stored rich text. Old plain-text values are converted to
// paragraphs first; everything is sanitized before it reaches the DOM.
export default function RichTextContent({
  value,
  className,
}: TRichTextContentProps) {
  const html = useMemo(
    () => sanitizeRichTextHtml(toRichTextHtml(value)),
    [value],
  );

  return (
    <div
      className={cn(RICH_TEXT_CONTENT_CLASS_NAME, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
