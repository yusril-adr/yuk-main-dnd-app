import { useEffect, useMemo, useRef } from "react";
import {
  EditorContent,
  Extension,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";
import { Else, If, Then } from "react-if";

import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  RICH_TEXT_CONTENT_CLASS_NAME,
  RICH_TEXT_EDITOR_SELECTED_IMAGE_CLASS_NAME,
} from "@/app/_constants/rich-text";
import type { TRichTextEditorProps } from "@/app/_types/rich-text-editor-props";
import { RichTextCharacterCount } from "@/libs/tiptap/rich-text-character-count";
// Image insert disabled: descriptions are stored as Markdown for Discord, which doesn't render inline images. Re-enable if Discord support isn't needed.
// import { RichTextImage } from "@/libs/tiptap/rich-text-image";
import { RichTextUnderline } from "@/libs/tiptap/rich-text-underline";
import { cn } from "@/utils/cn";
// Image insert disabled: descriptions are stored as Markdown for Discord, which doesn't render inline images. Re-enable if Discord support isn't needed.
// import { removeHtmlImages } from "@/utils/rich-text";

import RichTextToolbar from "./rich-text-toolbar";

const PLACEHOLDER_CLASS_NAME =
  "[&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:float-left [&_p.is-editor-empty:first-child]:before:h-0 [&_p.is-editor-empty:first-child]:before:text-muted-foreground [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]";

export default function RichTextEditor({
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  disabled = false,
  isInvalid = false,
  ariaLabelledBy,
  ariaDescribedBy,
  variant = "default",
  autoFocus = false,
  onSubmitShortcut,
  onEscape,
  onEditorChange,
}: TRichTextEditorProps) {
  const isMinimal = variant === "minimal";

  // Latest callbacks for the keyboard shortcuts, so the extensions (and the
  // editor) aren't recreated when the parent re-renders
  const shortcutsRef = useRef({ onSubmitShortcut, onEscape });
  useEffect(() => {
    shortcutsRef.current = { onSubmitShortcut, onEscape };
  }, [onSubmitShortcut, onEscape]);

  // Last Markdown sent through onChange. The parent's value can trail the
  // editor by a keystroke (fast typing), so an echo of what we emitted must
  // not be treated as an outside change and reset the content and caret
  const emittedValueRef = useRef<string | null>(null);

  const extensions = useMemo(
    () => [
      isMinimal
        ? // Comments: bold, italic, strikethrough and lists only. Nodes and
          // marks that aren't registered can't be created by typing, pasting
          // or loading Markdown either (they fall back to plain text)
          StarterKit.configure({
            heading: false,
            blockquote: false,
            code: false,
            codeBlock: false,
            horizontalRule: false,
            link: false,
            underline: false,
            // No forced empty paragraph after a list: it would be sent as
            // trailing blank lines (Enter twice still leaves a list)
            trailingNode: false,
          })
        : StarterKit.configure({
            heading: { levels: [1, 2, 3] },
            code: false,
            codeBlock: false,
            link: {
              openOnClick: false,
              autolink: true,
              defaultProtocol: "https",
            },
            // Divider disabled: descriptions are stored as Markdown for Discord,
            // which has no horizontal rule. Re-enable if Discord support isn't needed.
            horizontalRule: false,
            // Replaced by RichTextUnderline (Discord-style __text__ in Markdown)
            underline: false,
          }),
      ...(isMinimal ? [] : [RichTextUnderline]),
      // Content is loaded from and saved as Markdown (editor.getMarkdown())
      Markdown,
      Placeholder.configure({ placeholder }),
      // Image insert disabled: descriptions are stored as Markdown for Discord, which doesn't render inline images. Re-enable if Discord support isn't needed.
      // RichTextImage,
      // Images count as 0 characters (same as countRichTextCharacters)
      RichTextCharacterCount.configure({ limit: maxLength }),
      Extension.create({
        name: "richTextShortcuts",
        // Ahead of StarterKit's HardBreak, which also binds Mod-Enter
        priority: 1000,
        addKeyboardShortcuts: () => ({
          "Mod-Enter": () => {
            const handler = shortcutsRef.current.onSubmitShortcut;
            handler?.();
            return !!handler;
          },
          Escape: () => {
            const handler = shortcutsRef.current.onEscape;
            handler?.();
            return !!handler;
          },
        }),
      }),
    ],
    [placeholder, maxLength, isMinimal],
  );

  const editor = useEditor({
    // Next.js renders on the server first; create the editor after hydration
    immediatelyRender: false,
    // The toolbar and counter subscribe through useEditorState instead
    shouldRerenderOnTransaction: false,
    editable: !disabled,
    autofocus: autoFocus ? "end" : false,
    extensions,
    content: value,
    contentType: "markdown",
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        ...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {}),
        ...(ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {}),
        role: "textbox",
        "aria-multiline": "true",
        "aria-invalid": String(isInvalid),
        class: cn(
          RICH_TEXT_CONTENT_CLASS_NAME,
          RICH_TEXT_EDITOR_SELECTED_IMAGE_CLASS_NAME,
          PLACEHOLDER_CLASS_NAME,
          "px-3 py-2 text-base outline-none md:text-sm",
          // Comments stay compact and scroll inside instead of growing forever
          isMinimal ? "max-h-60 min-h-20 overflow-y-auto" : "min-h-32",
        ),
      },
      // Image insert disabled: descriptions are stored as Markdown for Discord, which doesn't render inline images. Re-enable if Discord support isn't needed.
      // Images only come from the Image button: strip <img> from pasted and
      // dropped HTML (runs for both paste and drop)
      // transformPastedHTML: (html) => removeHtmlImages(html),
      // Dropping files (e.g. an image from the desktop) would make the browser
      // open the file and leave the form; ignore them. Moving content inside
      // the editor still works
      handleDrop: (_view, event, _slice, moved) =>
        !moved && !!event.dataTransfer?.files.length,
    },
    // Stored as Markdown; an empty document is saved as "" so optional / required checks work
    onUpdate: ({ editor: currentEditor }) => {
      const markdown = currentEditor.isEmpty ? "" : currentEditor.getMarkdown();
      emittedValueRef.current = markdown;
      onChange(markdown);
    },
    onBlur: () => onBlur?.(),
  });

  // Values set from outside the editor (e.g. the edit form once the story loads)
  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentValue = editor.isEmpty ? "" : editor.getMarkdown();
    if (value !== currentValue && value !== emittedValueRef.current) {
      editor.commands.setContent(value, {
        emitUpdate: false,
        contentType: "markdown",
      });
    }
  }, [editor, value]);

  useEffect(() => {
    onEditorChange?.(editor);
    return () => onEditorChange?.(null);
  }, [editor, onEditorChange]);

  // useEditor keeps the current editable state on re-render, so sync it here
  useEffect(() => {
    editor?.setEditable(!disabled, false);
  }, [editor, disabled]);

  const characterCount = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) =>
      currentEditor?.storage.characterCount.characters() ?? 0,
  });

  return (
    <div
      data-slot="rich-text-editor"
      className={cn(
        "w-full overflow-hidden rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30",
        isInvalid &&
          "border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <If condition={!!editor}>
        <Then>
          {() => (
            <>
              <RichTextToolbar
                editor={editor as Editor}
                disabled={disabled}
                variant={variant}
              />
              <EditorContent editor={editor} />
              <If condition={!!maxLength}>
                <Then>
                  <p className="border-t px-3 py-1 text-end text-xs text-muted-foreground tabular-nums">
                    {characterCount ?? 0} / {maxLength}
                  </p>
                </Then>
              </If>
            </>
          )}
        </Then>
        <Else>
          {/* Roughly toolbar + content min height until the editor mounts */}
          <Skeleton
            className={cn(
              "rounded-none",
              isMinimal ? "h-[7.5rem]" : "h-[10.5rem]",
            )}
          />
        </Else>
      </If>
    </div>
  );
}
