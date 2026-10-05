import { useEditorState } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";

import { Separator } from "@/app/_components/ui/separator";
import type { TRichTextToolbarProps } from "@/app/_types/rich-text-toolbar-props";

import RichTextImagePopover from "./rich-text-image-popover";
import RichTextLinkPopover from "./rich-text-link-popover";
import RichTextToolbarButton from "./rich-text-toolbar-button";

export default function RichTextToolbar({
  editor,
  disabled = false,
}: TRichTextToolbarProps) {
  // Re-renders only when one of these values changes
  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      isBold: currentEditor.isActive("bold"),
      isItalic: currentEditor.isActive("italic"),
      isUnderline: currentEditor.isActive("underline"),
      isStrike: currentEditor.isActive("strike"),
      isLink: currentEditor.isActive("link"),
      isImage: currentEditor.isActive("image"),
      isHeading2: currentEditor.isActive("heading", { level: 2 }),
      isHeading3: currentEditor.isActive("heading", { level: 3 }),
      isBulletList: currentEditor.isActive("bulletList"),
      isOrderedList: currentEditor.isActive("orderedList"),
      isBlockquote: currentEditor.isActive("blockquote"),
      canUndo: currentEditor.can().undo(),
      canRedo: currentEditor.can().redo(),
    }),
  });

  return (
    <div
      role="toolbar"
      aria-label="Formatting"
      className="flex flex-wrap items-center gap-0.5 border-b bg-muted/40 p-1"
    >
      <RichTextToolbarButton
        label="Bold"
        icon={Bold}
        isActive={state.isBold}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <RichTextToolbarButton
        label="Italic"
        icon={Italic}
        isActive={state.isItalic}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <RichTextToolbarButton
        label="Underline"
        icon={Underline}
        isActive={state.isUnderline}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <RichTextToolbarButton
        label="Strikethrough"
        icon={Strikethrough}
        isActive={state.isStrike}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <RichTextLinkPopover
        editor={editor}
        isActive={state.isLink}
        disabled={disabled}
      />
      <RichTextImagePopover
        editor={editor}
        isActive={state.isImage}
        disabled={disabled}
      />

      <Separator orientation="vertical" className="mx-1" />

      <RichTextToolbarButton
        label="Heading"
        icon={Heading2}
        isActive={state.isHeading2}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <RichTextToolbarButton
        label="Subheading"
        icon={Heading3}
        isActive={state.isHeading3}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />

      <Separator orientation="vertical" className="mx-1" />

      <RichTextToolbarButton
        label="Bullet list"
        icon={List}
        isActive={state.isBulletList}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <RichTextToolbarButton
        label="Numbered list"
        icon={ListOrdered}
        isActive={state.isOrderedList}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <RichTextToolbarButton
        label="Read-aloud text (quote)"
        icon={Quote}
        isActive={state.isBlockquote}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <RichTextToolbarButton
        label="Divider"
        icon={Minus}
        disabled={disabled}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <Separator orientation="vertical" className="mx-1" />

      <RichTextToolbarButton
        label="Undo"
        icon={Undo2}
        disabled={disabled || !state.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <RichTextToolbarButton
        label="Redo"
        icon={Redo2}
        disabled={disabled || !state.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
}
