"use client";

import { useState } from "react";
import { EmojiPicker as EmojiPickerPrimitive } from "frimousse";

import { Button } from "@/app/_components/ui/button";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/app/_components/ui/emoji-picker";
import {
  RICH_TEXT_EMOJI_COLUMNS,
  RICH_TEXT_EMOJI_COMPACT_COLUMNS,
  RICH_TEXT_EMOJI_COMPACT_QUERY,
  RICH_TEXT_EMOJI_SKIN_TONES,
} from "@/app/_constants/rich-text";
import type { TRichTextEmojiPickerProps } from "@/app/_types/rich-text-emoji-picker-props";

// Loaded on the first popover open (client only). Emoji data comes from the
// default jsDelivr CDN and is cached by the browser
export default function RichTextEmojiPicker({
  onEmojiSelect,
  autoFocusSearch,
  skinTone,
  onSkinToneChange,
}: TRichTextEmojiPickerProps) {
  // Read once per open: fewer columns so the grid fits ~360px phones
  const [columns] = useState(() =>
    window.matchMedia(RICH_TEXT_EMOJI_COMPACT_QUERY).matches
      ? RICH_TEXT_EMOJI_COMPACT_COLUMNS
      : RICH_TEXT_EMOJI_COLUMNS,
  );

  return (
    <EmojiPicker
      columns={columns}
      skinTone={skinTone}
      onEmojiSelect={({ emoji }) => onEmojiSelect(emoji)}
      className="h-80 max-h-[60svh]"
    >
      {/* The popup opens before this lazy chunk exists, so focus the search on mount */}
      <EmojiPickerSearch
        aria-label="Search emoji"
        placeholder="Search…"
        autoFocus={autoFocusSearch}
      />
      <EmojiPickerContent />
      <div className="flex w-full max-w-(--frimousse-viewport-width) items-center border-t pe-1">
        <EmojiPickerFooter className="flex-1 border-t-0" />
        <EmojiPickerPrimitive.SkinTone>
          {({ skinTone: current, setSkinTone, skinToneVariations }) => {
            const index = RICH_TEXT_EMOJI_SKIN_TONES.indexOf(current);
            const next =
              RICH_TEXT_EMOJI_SKIN_TONES[
                (index + 1) % RICH_TEXT_EMOJI_SKIN_TONES.length
              ];
            const preview =
              skinToneVariations.find((item) => item.skinTone === current)
                ?.emoji ?? "✋";
            return (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Skin tone: ${current}. Change skin tone`}
                title="Change skin tone"
                className="text-base"
                onClick={() => {
                  setSkinTone(next);
                  onSkinToneChange(next);
                }}
              >
                {preview}
              </Button>
            );
          }}
        </EmojiPickerPrimitive.SkinTone>
      </div>
    </EmojiPicker>
  );
}
