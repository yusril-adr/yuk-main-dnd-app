"use client";

import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { CardFooter } from "@/app/_components/ui/card";
import { useT } from "@/app/_hooks/use-t";
import { getGuildmateHref, makeDefaultAvatarUrl } from "@/utils/user-helper";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryDetailDungeonMasterProps } from "@/app/(public)/stories/[slug]/_types/public-story-detail-dungeon-master-props";

export default function PublicStoryDetailDungeonMaster({
  creator,
}: TPublicStoryDetailDungeonMasterProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);

  if (!creator) {
    return null;
  }

  return (
    <CardFooter className="-mb-(--card-spacing) gap-3 border-t bg-muted/30 py-4">
      <Link
        href={getGuildmateHref(creator)}
        className="group flex min-w-0 flex-1 items-center gap-3 rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Avatar className="size-10 ring-2 ring-primary/30">
          <AvatarImage
            src={
              creator.avatar_url ?? makeDefaultAvatarUrl(creator.display_name)
            }
            alt={creator.display_name}
            loading="lazy"
          />
          <AvatarFallback>
            {creator.display_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="text-xs text-muted-foreground">
            {t("summary.dungeonMaster")}
          </span>
          <span className="truncate font-medium underline-offset-4 group-hover:text-primary group-hover:underline">
            {creator.display_name}
          </span>
        </div>
      </Link>
    </CardFooter>
  );
}
