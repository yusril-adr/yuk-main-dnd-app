import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link as LinkIcon, Link2Off } from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldError, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { RICH_TEXT_TOOLBAR_ACTIVE_CLASS_NAME } from "@/app/_constants/rich-text";
import type { TRichTextLinkPopoverProps } from "@/app/_types/rich-text-link-popover-props";
import { cn } from "@/utils/cn";
import { normalizeRichTextLinkUrl } from "@/utils/rich-text";

export default function RichTextLinkPopover({
  editor,
  isActive,
  disabled = false,
}: TRichTextLinkPopoverProps) {
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isUrlInvalid, setIsUrlInvalid] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (open) {
      // Prefill with the link under the cursor / selection
      setUrl((editor.getAttributes("link").href as string | undefined) ?? "");
      setIsUrlInvalid(false);
    }
    setIsOpen(open);
  };

  const onApply = () => {
    const href = normalizeRichTextLinkUrl(url);
    if (!href) {
      setIsUrlInvalid(true);
      return;
    }

    if (editor.state.selection.empty && !editor.isActive("link")) {
      // Nothing selected and not inside a link: insert the URL as linked text
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: href,
          marks: [{ type: "link", attrs: { href } }],
        })
        .run();
    } else {
      // With an empty selection inside a link, extendMarkRange edits the whole link
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setIsOpen(false);
  };

  const onRemove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setIsOpen(false);
  };

  const onUrlKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Apply the link instead of submitting the story form
      event.preventDefault();
      event.stopPropagation();
      onApply();
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
            aria-label="Link"
            title="Link"
            aria-pressed={isActive}
            className={cn(isActive && RICH_TEXT_TOOLBAR_ACTIVE_CLASS_NAME)}
          />
        }
      >
        <LinkIcon />
      </PopoverTrigger>
      {/* Apply / Remove focus the editor themselves; don't move focus back to the trigger */}
      <PopoverContent align="start" className="w-80 gap-3" finalFocus={false}>
        <Field className="grid gap-1.5" data-invalid={isUrlInvalid}>
          <FieldLabel htmlFor={inputId}>Link URL</FieldLabel>
          <Input
            id={inputId}
            type="text"
            inputMode="url"
            autoComplete="off"
            placeholder="https://example.com"
            value={url}
            aria-invalid={isUrlInvalid}
            onChange={(event) => {
              setUrl(event.target.value);
              setIsUrlInvalid(false);
            }}
            onKeyDown={onUrlKeyDown}
          />
          <If condition={isUrlInvalid}>
            <Then>
              <FieldError>Enter a valid http, https or mailto link.</FieldError>
            </Then>
          </If>
        </Field>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={!isActive}
            onClick={onRemove}
          >
            <Link2Off /> Remove
          </Button>
          <Button type="button" size="sm" onClick={onApply}>
            <LinkIcon /> Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
