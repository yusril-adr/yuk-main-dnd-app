import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { ImagePlus } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldError, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { RICH_TEXT_TOOLBAR_ACTIVE_CLASS_NAME } from "@/app/_constants/rich-text";
import type { TRichTextImagePopoverProps } from "@/app/_types/rich-text-image-popover-props";
import { cn } from "@/utils/cn";
import { normalizeRichTextImageUrl } from "@/utils/rich-text";

export default function RichTextImagePopover({
  editor,
  isActive,
  disabled = false,
}: TRichTextImagePopoverProps) {
  const urlInputId = useId();
  const altInputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [isUrlInvalid, setIsUrlInvalid] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (open) {
      // A selected image prefills the form so it can be edited
      const attributes = editor.getAttributes("image");
      setUrl((attributes.src as string | undefined) ?? "");
      setAlt((attributes.alt as string | undefined) ?? "");
      setIsUrlInvalid(false);
    }
    setIsOpen(open);
  };

  const onInsert = () => {
    const src = normalizeRichTextImageUrl(url);
    if (!src) {
      setIsUrlInvalid(true);
      return;
    }

    const trimmedAlt = alt.trim();
    // Replaces the selected image, or inserts a new block image at the cursor
    editor
      .chain()
      .focus()
      .setImage({ src, ...(trimmedAlt ? { alt: trimmedAlt } : {}) })
      .run();
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
    editor.commands.focus();
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Insert the image instead of submitting the story form
      event.preventDefault();
      event.stopPropagation();
      onInsert();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Image"
            title="Image"
            aria-pressed={isActive}
            className={cn(isActive && RICH_TEXT_TOOLBAR_ACTIVE_CLASS_NAME)}
          />
        }
      >
        <ImagePlus />
      </PopoverTrigger>
      {/* Insert / Cancel focus the editor themselves; don't move focus back to the trigger */}
      <PopoverContent align="start" className="w-80 gap-3" finalFocus={false}>
        <Field className="grid gap-1.5" data-invalid={isUrlInvalid}>
          <FieldLabel htmlFor={urlInputId}>Image URL</FieldLabel>
          <Input
            id={urlInputId}
            type="text"
            inputMode="url"
            autoComplete="off"
            placeholder="https://example.com/map.png"
            value={url}
            aria-invalid={isUrlInvalid}
            onChange={(event) => {
              setUrl(event.target.value);
              setIsUrlInvalid(false);
            }}
            onKeyDown={onInputKeyDown}
          />
          <If condition={isUrlInvalid}>
            <Then>
              <FieldError>Enter a valid https image URL.</FieldError>
            </Then>
          </If>
        </Field>
        <Field className="grid gap-1.5">
          <FieldLabel htmlFor={altInputId}>Alt text (optional)</FieldLabel>
          <Input
            id={altInputId}
            type="text"
            autoComplete="off"
            placeholder="Describe the image"
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            onKeyDown={onInputKeyDown}
          />
        </Field>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" size="sm" onClick={onInsert}>
            <ImagePlus />
            <If condition={isActive}>
              <Then>Update</Then>
              <Else>Insert</Else>
            </If>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
