"use client";

import { useEffect, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import { Textarea } from "@/app/_components/ui/textarea";
import MainAPIValidationError from "@/api/main/errors/validation-error";
import { applyValidationErrors } from "@/utils/validation-helper";
import { toCamelCase } from "@/utils/format-text";
import { cn } from "@/utils/cn";

import {
  PublicStoryCommentFormSchema,
  type TPublicStoryCommentFormSchema,
} from "./scheme";
import { PUBLIC_STORY_COMMENT_MAX_LENGTH } from "@/app/(public)/stories/[slug]/_constants/public-story-comment";
import type { TPublicStoryCommentFormProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-form-props";

// "@a @b " only holds mentions: a new mention replaces it
const MENTIONS_ONLY = /^\s*(@\S+\s*)*$/;

// Mention merge: blank or mentions only -> just the new mention; text
// without the mention -> prepend it; text that has it -> unchanged
function mergeMention(content: string, username: string) {
  const mention = `@${username}`;
  if (MENTIONS_ONLY.test(content)) return `${mention} `;
  if (content.split(/\s+/).includes(mention)) return content;
  return `${mention} ${content}`;
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
  mention,
}: TPublicStoryCommentFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { control, handleSubmit, setError, reset, getValues, setValue } =
    useForm<TPublicStoryCommentFormSchema>({
      resolver: zodResolver(PublicStoryCommentFormSchema),
      defaultValues: { content: defaultContent },
    });

  const length = useWatch({ control, name: "content" }).length;
  const isOverLimit = length > PUBLIC_STORY_COMMENT_MAX_LENGTH;
  const counterId = `${id}-counter`;

  const mentionUsername = mention?.username;
  const mentionRequestId = mention?.requestId;
  useEffect(() => {
    if (!mentionUsername) return;
    const content = mergeMention(getValues("content"), mentionUsername);
    setValue("content", content, { shouldDirty: true });
    // After the new value renders: focus with the caret at the end
    const frame = requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(content.length, content.length);
    });
    return () => cancelAnimationFrame(frame);
  }, [mentionUsername, mentionRequestId, getValues, setValue]);

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
            <FieldLabel htmlFor={id} className="sr-only">
              {label}
            </FieldLabel>
            <Textarea
              id={id}
              placeholder={placeholder}
              disabled={isPending}
              autoFocus={autoFocus}
              aria-invalid={fieldState.invalid}
              aria-describedby={counterId}
              className="min-h-24 bg-background"
              onKeyDown={(event) => {
                // Ctrl/Cmd + Enter posts, plain Enter adds a new line
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  submit();
                }
                if (event.key === "Escape" && onCancel) {
                  event.preventDefault();
                  onCancel();
                }
              }}
              {...field}
              ref={(element) => {
                field.ref(element);
                textareaRef.current = element;
              }}
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
    </form>
  );
}
