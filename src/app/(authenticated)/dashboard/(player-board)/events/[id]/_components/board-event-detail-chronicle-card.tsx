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

import BoardEventDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-section-card";
import BoardEventDetailInfoRow from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-info-row";
import { BOARD_EVENT_DATE_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/events/_constants/board-event";
import { BOARD_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_messages";
import type { TBoardEventDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

export default function BoardEventDetailChronicleCard({
  event,
  className,
}: TBoardEventDetailCardProps) {
  const { t } = useT(BOARD_EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const creator = event.created_by;

  return (
    <BoardEventDetailSectionCard
      icon={Feather}
      title={t("chronicle.title")}
      className={className}
    >
      <BoardEventDetailInfoRow
        icon={Feather}
        label={t("chronicle.writtenBy")}
        value={
          creator?.display_name && (
            // Guildmate pages accept the username or the id.
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
      <BoardEventDetailInfoRow
        icon={CalendarPlus}
        label={t("chronicle.recorded")}
        value={dayjs(event.created_at)
          .locale(locale)
          .format(BOARD_EVENT_DATE_FORMAT)}
        emptyText="-"
      />
      <BoardEventDetailInfoRow
        icon={History}
        label={t("chronicle.lastUpdated")}
        value={
          event.updated_at
            ? dayjs(event.updated_at)
                .locale(locale)
                .format(BOARD_EVENT_DATE_FORMAT)
            : null
        }
        emptyText="-"
      />
    </BoardEventDetailSectionCard>
  );
}
