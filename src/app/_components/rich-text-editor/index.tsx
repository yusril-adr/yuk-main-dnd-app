import { useEffect, useMemo } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { Else, If, Then } from "react-if";

import { Skeleton } from "@/app/_components/ui/skeleton";
import { RICH_TEXT_CONTENT_CLASS_NAME } from "@/app/_constants/rich-text";
import type { TRichTextEditorProps } from "@/app/_types/rich-text-editor-props";
import { cn } from "@/utils/cn";

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
}: TRichTextEditorProps) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({ limit: maxLength }),
    ],
    [placeholder, maxLength],
  );

  const editor = useEditor({
    // Next.js renders on the server first; create the editor after hydration
    immediatelyRender: false,
    // The toolbar and counter subscribe through useEditorState instead
    shouldRerenderOnTransaction: false,
    editable: !disabled,
    extensions,
    content: value,
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        ...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {}),
        role: "textbox",
        "aria-multiline": "true",
        "aria-invalid": String(isInvalid),
        class: cn(
          RICH_TEXT_CONTENT_CLASS_NAME,
          PLACEHOLDER_CLASS_NAME,
          "min-h-32 px-3 py-2 text-base outline-none md:text-sm",
        ),
      },
    },
    // An empty document is "<p></p>"; store "" so optional / required checks work
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.isEmpty ? "" : currentEditor.getHTML());
    },
    onBlur: () => onBlur?.(),
  });

  // Values set from outside the editor (e.g. the edit form once the story loads)
  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentValue = editor.isEmpty ? "" : editor.getHTML();
    if (value !== currentValue) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

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
              <RichTextToolbar editor={editor as Editor} disabled={disabled} />
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
          {/* Roughly toolbar + min-h-32 content until the editor mounts */}
          <Skeleton className="h-[10.5rem] rounded-none" />
        </Else>
      </If>
    </div>
  );
}
