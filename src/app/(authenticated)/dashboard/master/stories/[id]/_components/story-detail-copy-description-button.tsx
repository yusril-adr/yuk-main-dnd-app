"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/app/_components/ui/button";
import type { TStoryDetailCopyDescriptionButtonProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-copy-description-button-props";

// Copies the stored Markdown as-is (it's already Discord-flavoured)
export default function StoryDetailCopyDescriptionButton({
  description,
}: TStoryDetailCopyDescriptionButtonProps) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      toast.success("Description copied");
    } catch {
      toast.error("Couldn't copy the description");
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Copy description for Discord"
      title="Copy for Discord"
      onClick={onCopy}
    >
      <Copy />
    </Button>
  );
}
