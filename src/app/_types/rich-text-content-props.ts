export type TRichTextContentProps = {
  value: string;
  className?: string;
  // "comment": minimal marks and lists only, other Markdown shown as written
  variant?: "default" | "comment";
  // Comment only: highlight a leading "@username"
  highlightLeadingMention?: boolean;
};
