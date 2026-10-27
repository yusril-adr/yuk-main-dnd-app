import type { Editor } from "@tiptap/react";

import type { TRichTextEditorVariant } from "@/app/_types/rich-text-editor-props";

export type TRichTextToolbarProps = {
  editor: Editor;
  disabled?: boolean;
  variant?: TRichTextEditorVariant;
};
