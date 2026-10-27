"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { If, Then } from "react-if";
import { Selection } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import RichTextEditor from "@/app/_components/rich-text-editor";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import {
  applyValidationErrors,
  getApiStringLength,
} from "@/utils/validation-helper";
import { toCamelCase } from "@/utils/format-text";
import { cn } from "cn";

import {
  PublicStoryCommentFormSchema,
  toPublicStoryCommentContent,
  type TPublicStoryCommentFormSchema,
} from "./scheme";
import {
  PUBLIC_STORY_COMMENT_GUIDELINE,
  PUBLIC_STORY_COMMENT_MAX_LENGTH,
} from "@/app/(public)/stories/[slug]/_constants/public-story-comment";
import type { TPublicStoryCommentFormProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-form-props";

// "@a @b " only holds mentions: a new mention replaces it
const MENTIONS_ONLY = /^\s*(@\S+\s*)*$/;

// Mention merge, done on the editor so the trailing space survives (a
// Markdown round trip would drop it): blank or mentions only -> just the new
// mention; text without the mention -> prepend it; text that has it ->
// unchanged. Then focus with the caret at the end
function mergeMention(editor: Editor, username: string) {
  const mention = `@${username}`;
  const text = editor.getText();
  const chain = editor.chain();
  if (MENTIONS_ONLY.test(text)) {
    chain.setContent({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: `${mention} ` }] },
      ],
    });
  } else if (!text.split(/\s+/).includes(mention)) {
    chain.insertContentAt(
      Selection.atStart(editor.state.doc).from,
      `${mention} `,
    );
  }
  chain.focus("end").run();
}

// Used for new comments, inline edits and replies
export default function PublicStoryCommentForm({
  id,
  label,
  defaultContent = "",
  placeholder,
  submitLabel,
  isPending,
  onSubmit,
  onCancel,
  autoFocus,
  isShowGuideline,
  mention,
}: TPublicStoryCommentFormProps) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const { control, handleSubmit, setError, reset } =
    useForm<TPublicStoryCommentFormSchema>({
      resolver: zodResolver(PublicStoryCommentFormSchema),
      defaultValues: { content: defaultContent },
    });

  // Same count as the API's @MaxLength: the raw Markdown that is sent
  const length = getApiStringLength(
    toPublicStoryCommentContent(useWatch({ control, name: "content" })),
  );
  const isOverLimit = length > PUBLIC_STORY_COMMENT_MAX_LENGTH;
  const labelId = `${id}-label`;
  const counterId = `${id}-counter`;

  const mentionUsername = mention?.username;
  const mentionRequestId = mention?.requestId;
  useEffect(() => {
    if (!mentionUsername || !editor) return;
    mergeMention(editor, mentionUsername);
  }, [mentionUsername, mentionRequestId, editor]);

  const submit = handleSubmit(async ({ content }) => {
    try {
      await onSubmit(content);
      reset({ content: onCancel ? content : "" });
    } catch (error) {
      if (error instanceof MainAPIValidationError) {
        applyValidationErrors(
          setError,
          error.errors.map((item) => ({
            property: toCamelCase(String(item.property)),
            messages: item.messages,
          })),
        );
      }
      // Other errors are toasted by the mutation; keep the text
    }
  });

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="grid gap-1.5" data-invalid={fieldState.invalid}>
            <FieldLabel id={labelId} className="sr-only">
              {label}
            </FieldLabel>
            {/* Stored as Markdown; Ctrl/Cmd + Enter posts, Enter adds a line */}
            <RichTextEditor
              id={id}
              variant="minimal"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              disabled={isPending}
              isInvalid={fieldState.invalid}
              ariaLabelledBy={labelId}
              ariaDescribedBy={counterId}
              autoFocus={autoFocus}
              onSubmitShortcut={submit}
              onEscape={onCancel}
              onEditorChange={setEditor}
            />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <If condition={fieldState.invalid}>
                  <Then>
                    <FieldError errors={[fieldState.error]} />
                  </Then>
                </If>
              </div>
              <FieldDescription
                id={counterId}
                className={cn(
                  "shrink-0 text-xs tabular-nums",
                  isOverLimit && "text-destructive",
                )}
              >
                <span className="sr-only">Characters used: </span>
                {length}/{PUBLIC_STORY_COMMENT_MAX_LENGTH}
              </FieldDescription>
            </div>
          </Field>
        )}
      />

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <If condition={!!onCancel}>
          <Then>
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Then>
        </If>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : <Send />}
          {submitLabel}
        </Button>
      </div>

      <If condition={!!isShowGuideline}>
        <Then>
          <p className="text-xs text-pretty text-muted-foreground">
            {PUBLIC_STORY_COMMENT_GUIDELINE}
          </p>
        </Then>
      </If>
    </form>
  );
}
