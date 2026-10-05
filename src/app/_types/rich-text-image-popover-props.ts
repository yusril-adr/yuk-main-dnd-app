import type { Editor } from "@tiptap/react";

export type TRichTextImagePopoverProps = {
  editor: Editor;
  // An image is selected (the popover then edits it)
  isActive: boolean;
  disabled?: boolean;
};
