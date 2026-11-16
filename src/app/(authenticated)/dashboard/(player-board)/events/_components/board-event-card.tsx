"use client";

import Link from "next/link";
import { CalendarDays, Crown, Users } from "lucide-react";

import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";
import dayjs from "@/libs/dayjs";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";

import BoardEventBanner from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-banner";
import BoardEventStatusBadge from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-status-badge";
import BoardEventMemberStatusBadge from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-member-status-badge";
import { BOARD_EVENT_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/events/_constants/board-event";
import { BOARD_EVENTS_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/_messages";
import {
  formatBoardEventMembers,
  getBoardEventHref,
} from "@/app/(authenticated)/dashboard/(player-board)/events/_utils/board-event-helper";
import type { TBoardEventCardProps } from "@/app/(authenticated)/dashboard/(player-board)/events/_types/board-event-components-props";

const STATUS_KEY = {
  [EventStatusEnum.DRAFT]: "enums.status.draft",
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.ARCHIVED]: "enums.status.archived",
  [EventStatusEnum.CANCELLED]: "enums.status.cancelled",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const MEMBER_STATUS_KEY = {
  [EventMemberStatusEnum.REGISTERED]: "enums.memberStatus.registered",
  [EventMemberStatusEnum.ABSENT]: "enums.memberStatus.absent",
  [EventMemberStatusEnum.ATTENDED]: "enums.memberStatus.attended",
} as const;

// The title link is stretched over the whole card (after:inset-0), so the
// card stays one click target without wrapping block content in <a>
export default function BoardEventCard({ event }: TBoardEventCardProps) {
  const { t } = useT(BOARD_EVENTS_MESSAGES);
  const { locale } = useLocale();

  return (
    <Card
      size="sm"
      className="group relative gap-3 pt-0 transition-colors hover:ring-primary/50 has-focus-visible:ring-2 has-focus-visible:ring-ring"
    >
      <AspectRatio ratio={16 / 10} className="overflow-hidden border-b">
        <BoardEventBanner bannerUrl={event.banner_url} title={event.title} />
        <BoardEventStatusBadge
          status={event.status}
          label={t(STATUS_KEY[event.status])}
          className="absolute top-2 left-2 bg-card"
        />
      </AspectRatio>

      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={2}
          className="line-clamp-2 font-heading text-lg leading-snug group-hover:text-primary group-data-[size=sm]/card:text-lg"
        >
          <Link
            href={getBoardEventHref(event.id)}
            className="outline-none after:absolute after:inset-0"
          >
            {event.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="flex flex-col gap-1.5 text-sm text-foreground/80">
          <div className="flex items-center gap-2">
            <Crown className="size-4 shrink-0 text-primary" />
            <dt className="sr-only">{t("card.dungeonMaster")}</dt>
            <dd className="truncate">
              {event.created_by?.display_name ?? t("card.unknownDm")}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-primary" />
            <dt className="sr-only">{t("card.starts")}</dt>
            <dd>
              {event.start_at
                ? dayjs(event.start_at)
                    .locale(locale)
                    .format(BOARD_EVENT_START_AT_FORMAT)
                : t("card.dateTba")}
            </dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="mt-auto justify-between gap-2 border-t">
        <BoardEventMemberStatusBadge
          memberStatus={event.member_status}
          label={t(MEMBER_STATUS_KEY[event.member_status])}
        />
        <span className="flex items-center gap-1.5 text-sm text-foreground/80">
          <Users className="size-4 text-primary" />
          <span className="sr-only">{t("card.members")}</span>
          {formatBoardEventMembers(event.joined_members, event.max_members)}
        </span>
      </CardFooter>
    </Card>
  );
}
