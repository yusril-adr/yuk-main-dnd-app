"use client";

import { CalendarDays } from "lucide-react";
import { Else, If, Then } from "react-if";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { useT } from "@/app/_hooks/use-t";

import BoardEventStatusBadge from "@/app/(authenticated)/dashboard/(player-board)/events/_components/board-event-status-badge";
import BoardEventDetailSlug from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-slug";
import { BOARD_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_messages";
import type { TBoardEventDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

// Banner strip at a capped responsive height with a centre crop, so any
// image ratio fills it. Solid placeholder (no gradient) without a banner.
const BANNER_HEIGHT = "h-48 sm:h-56 lg:h-64";

const STATUS_KEY = {
  [EventStatusEnum.DRAFT]: "enums.status.draft",
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.ARCHIVED]: "enums.status.archived",
  [EventStatusEnum.CANCELLED]: "enums.status.cancelled",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

export default function BoardEventDetailHero({
  event,
}: TBoardEventDetailCardProps) {
  const { t } = useT(BOARD_EVENT_DETAIL_MESSAGES);

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <If condition={!!event.banner_url}>
        <Then>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.banner_url ?? undefined}
            alt={event.title}
            className={`block w-full object-cover ${BANNER_HEIGHT}`}
          />
        </Then>
        <Else>
          <div
            aria-hidden
            className={`flex w-full items-center justify-center bg-secondary ${BANNER_HEIGHT}`}
          >
            <CalendarDays className="size-10 text-primary" />
          </div>
        </Else>
      </If>

      <CardHeader className="gap-2 border-t py-6">
        <CardTitle
          role="heading"
          aria-level={2}
          className="font-heading text-2xl font-medium leading-tight break-words sm:text-3xl"
        >
          {event.title}
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <BoardEventStatusBadge
            status={event.status}
            label={t(STATUS_KEY[event.status])}
          />
          <BoardEventDetailSlug
            slug={event.slug}
            isCanViewPublic={event.action_list.is_can_view_public}
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
