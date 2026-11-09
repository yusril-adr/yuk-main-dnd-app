"use client";

import Link from "next/link";
import { CalendarPlus, Feather, History } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import dayjs from "@/libs/dayjs";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";

import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import BoardStoryDetailInfoRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-info-row";
import { BOARD_STORY_DATE_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailChronicleCard({
  story,
  className,
}: TBoardStoryDetailCardProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const creator = story.created_by;

  return (
    <BoardStoryDetailSectionCard
      icon={Feather}
      title={t("chronicle.title")}
      className={className}
    >
      <BoardStoryDetailInfoRow
        icon={Feather}
        label={t("chronicle.writtenBy")}
        value={
          creator?.display_name && (
            // The board creator has no username; guildmate pages accept the id.
            // Avatar and name are one link to the guildmate page.
            <Link
              href={getGuildmateHref(creator)}
              className="group/user flex min-w-0 items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Avatar className="size-7">
                <AvatarImage
                  src={
                    creator.avatar_url ??
                    makeDefaultAvatarUrl(creator.display_name)
                  }
                  alt={creator.display_name}
                />
                <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
                  {getInitials(creator.display_name)}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 truncate text-primary underline-offset-4 group-hover/user:underline">
                {creator.display_name}
              </span>
            </Link>
          )
        }
        emptyText={t("chronicle.unknown")}
      />
      <BoardStoryDetailInfoRow
        icon={CalendarPlus}
        label={t("chronicle.recorded")}
        value={dayjs(story.created_at)
          .locale(locale)
          .format(BOARD_STORY_DATE_FORMAT)}
        emptyText="-"
      />
      <BoardStoryDetailInfoRow
        icon={History}
        label={t("chronicle.lastUpdated")}
        value={
          story.updated_at
            ? dayjs(story.updated_at)
                .locale(locale)
                .format(BOARD_STORY_DATE_FORMAT)
            : null
        }
        emptyText="-"
      />
    </BoardStoryDetailSectionCard>
  );
}
