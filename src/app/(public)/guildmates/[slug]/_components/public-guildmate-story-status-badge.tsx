"use client";

import { Diamond } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "cn";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { STORY_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-status-label";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";

import type { TPublicGuildmateStoryStatusBadgeProps } from "@/app/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

export default function PublicGuildmateStoryStatusBadge({
  status,
  className,
}: TPublicGuildmateStoryStatusBadgeProps) {
  const { t } = useT(GUILDMATES_MESSAGES);
  const isOpen = status === StoryStatusEnum.PUBLISHED;

  return (
    <Badge
      variant={isOpen ? "default" : "outline"}
      className={cn(
        "gap-1 rounded-sm px-2 shadow-none [&>svg]:size-2.5 [&>svg]:fill-current",
        !isOpen && "bg-background text-muted-foreground",
        className,
      )}
    >
      <Diamond aria-hidden />
      {isOpen ? t("story.recruiting") : STORY_STATUS_LABEL[status]}
    </Badge>
  );
}
