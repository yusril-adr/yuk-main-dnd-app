import type { SkinTone } from "frimousse";

export type TRichTextEmojiPickerProps = {
  onEmojiSelect: (emoji: string) => void;
  autoFocusSearch: boolean;
  skinTone: SkinTone;
  onSkinToneChange: (skinTone: SkinTone) => void;
};
