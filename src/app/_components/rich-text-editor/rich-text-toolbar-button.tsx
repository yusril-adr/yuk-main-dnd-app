import { Button } from "@/app/_components/ui/button";
import { RICH_TEXT_TOOLBAR_ACTIVE_CLASS_NAME } from "@/app/_constants/rich-text";
import type { TRichTextToolbarButtonProps } from "@/app/_types/rich-text-toolbar-button-props";
import { cn } from "@/utils/cn";

export default function RichTextToolbarButton({
  label,
  icon: Icon,
  isActive,
  disabled = false,
  onClick,
}: TRichTextToolbarButtonProps) {
  return (
    <Button
      // Never submit the surrounding form
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      title={label}
      aria-pressed={isActive}
      disabled={disabled}
      onClick={onClick}
      className={cn(isActive && RICH_TEXT_TOOLBAR_ACTIVE_CLASS_NAME)}
    >
      <Icon />
    </Button>
  );
}
