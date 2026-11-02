"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import type { TStoryDetailCopyDescriptionButtonProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-copy-description-button-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

// Copies the stored Markdown as-is (it's already Discord-flavoured)
export default function StoryDetailCopyDescriptionButton({
  description,
}: TStoryDetailCopyDescriptionButtonProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);

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
