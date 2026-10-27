import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SmilePlus } from "lucide-react";
import type { SkinTone } from "frimousse";
import type { PopoverRootChangeEventDetails } from "@base-ui/react/popover";

import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Skeleton } from "@/app/_components/ui/skeleton";
import type { TRichTextEmojiPopoverProps } from "@/app/_types/rich-text-emoji-popover-props";

// Picker code is fetched the first time the popover opens
const RichTextEmojiPicker = dynamic(() => import("./rich-text-emoji-picker"), {
  ssr: false,
  loading: () => <Skeleton className="h-80 max-h-[60svh] w-72" />,
});

export default function RichTextEmojiPopover({
  editor,
  disabled = false,
}: TRichTextEmojiPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Tapped open: don't focus the search, the phone keyboard would cover the grid
  const [isTouchOpen, setIsTouchOpen] = useState(false);
  // Kept while the editor lives, so the tone survives reopening
  const [skinTone, setSkinTone] = useState<SkinTone>("none");
  // After a pick the editor already has focus; don't move it to the trigger
  const isPickedRef = useRef(false);

  const onOpenChange = (
    open: boolean,
    { event }: PopoverRootChangeEventDetails,
  ) => {
    if (open) {
      isPickedRef.current = false;
      setIsTouchOpen(
        event instanceof PointerEvent && event.pointerType === "touch",
      );
    }
    setIsOpen(open);
  };

  const onEmojiSelect = (emoji: string) => {
    isPickedRef.current = true;
    // The editor keeps its selection while blurred: insert at the caret
    editor.chain().focus().insertContent(emoji).run();
    setIsOpen(false);
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
            aria-label="Emoji"
            title="Emoji"
          />
        }
      >
        <SmilePlus />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-fit gap-0 p-0"
        finalFocus={() => !isPickedRef.current}
      >
        <RichTextEmojiPicker
          onEmojiSelect={onEmojiSelect}
          autoFocusSearch={!isTouchOpen}
          skinTone={skinTone}
          onSkinToneChange={setSkinTone}
        />
      </PopoverContent>
    </Popover>
  );
}
