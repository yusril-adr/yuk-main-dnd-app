import type { Editor } from "@tiptap/react";

// "default": story description (headings, links, quotes, underline...).
// "minimal": comments (bold, italic, strikethrough, lists), compact height
export type TRichTextEditorVariant = "default" | "minimal";

export type TRichTextEditorProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  isInvalid?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  variant?: TRichTextEditorVariant;
  // Focus with the caret at the end once the editor mounts
  autoFocus?: boolean;
  // Ctrl/Cmd + Enter
  onSubmitShortcut?: () => void;
  // Escape
  onEscape?: () => void;
  // The editor instance once created (null before / after), for callers that
  // insert content themselves (e.g. a reply's @mention)
  onEditorChange?: (editor: Editor | null) => void;
};
