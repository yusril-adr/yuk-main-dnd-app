import type { LucideIcon } from "lucide-react";

export type TRichTextToolbarButtonProps = {
  label: string;
  icon: LucideIcon;
  // Only for toggles (bold, lists, ...); undo / redo leave it undefined
  isActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
};
