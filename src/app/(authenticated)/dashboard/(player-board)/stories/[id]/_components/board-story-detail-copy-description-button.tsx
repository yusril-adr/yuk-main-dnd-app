"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";

import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailCopyDescriptionButtonProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// Copies the stored Markdown as-is (it's already Discord-flavoured)
export default function BoardStoryDetailCopyDescriptionButton({
  description,
}: TBoardStoryDetailCopyDescriptionButtonProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      toast.success(t("quest.copySuccess"));
    } catch {
      toast.error(t("quest.copyError"));
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={t("quest.copyAria")}
      title={t("quest.copyTitle")}
      onClick={onCopy}
    >
      <Copy />
    </Button>
  );
}
