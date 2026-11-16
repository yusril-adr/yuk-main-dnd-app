"use client";

import { CalendarClock, ClipboardList, Map, Trophy, Users } from "lucide-react";
import { If, Then } from "react-if";

import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import dayjs from "@/libs/dayjs";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";

import BoardEventDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-section-card";
import BoardEventDetailInfoRow from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-info-row";
import BoardEventDetailExternalLink from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_components/board-event-detail-external-link";
import { BOARD_EVENT_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_constants/board-event-detail";
import { BOARD_EVENT_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/events/_constants/board-event";
import { BOARD_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_messages";
import type { TBoardEventDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/events/[id]/_types/board-event-detail-components-props";

const LOCATION_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function BoardEventDetailAdventureCard({
  event,
  className,
}: TBoardEventDetailCardProps) {
  const { t } = useT(BOARD_EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const number = new Intl.NumberFormat(localeToBcp47(locale));

  const partySize = event.max_members
    ? t("adventure.partySizeValue", { count: event.max_members })
    : null;
  // "250 EXP · 100 GP"; zero rewards are left out, null when both are 0
  const rewards =
    [
      event.exp_awarded > 0
        ? t("adventure.exp", { count: number.format(event.exp_awarded) })
        : null,
      event.point_awarded > 0
        ? t("adventure.gp", { count: number.format(event.point_awarded) })
        : null,
    ]
      .filter(Boolean)
      .join(" · ") || null;
  const startAt = event.start_at
    ? dayjs(event.start_at).locale(locale).format(BOARD_EVENT_START_AT_FORMAT)
    : null;
  // Map link is only for offline events that have a link
  const mapHref =
    event.location_type === EventLocationTypeEnum.OFFLINE
      ? event.location_link
      : null;
  const mapLink = mapHref ? (
    <BoardEventDetailExternalLink href={mapHref}>
      {t("adventure.openMap")}
    </BoardEventDetailExternalLink>
  ) : null;
  const feedbackHref = event.feedback_form_link;
  const feedbackLink = feedbackHref ? (
    <BoardEventDetailExternalLink href={feedbackHref}>
      {t("adventure.openFeedback")}
    </BoardEventDetailExternalLink>
  ) : null;

  return (
    <BoardEventDetailSectionCard
      icon={Map}
      title={t("adventure.title")}
      className={className}
    >
      <BoardEventDetailInfoRow
        icon={Users}
        label={t("adventure.partySize")}
        value={partySize}
        emptyText={t("adventure.noLimit")}
      />
      <BoardEventDetailInfoRow
        icon={Trophy}
        label={t("adventure.rewards")}
        value={rewards}
        emptyText={t("adventure.noRewards")}
      />
      <BoardEventDetailInfoRow
        icon={CalendarClock}
        label={t("adventure.starts")}
        value={startAt}
        emptyText={t("adventure.notScheduled")}
      />
      <BoardEventDetailInfoRow
        icon={BOARD_EVENT_LOCATION_TYPE_ICON[event.location_type]}
        label={t("adventure.location", {
          type: t(LOCATION_KEY[event.location_type]),
        })}
        value={
          <span className="flex w-full flex-col items-start gap-1">
            {event.location_detail}
            <If condition={!!mapLink}>
              <Then>{mapLink}</Then>
            </If>
          </span>
        }
        emptyText="-"
      />
      <If condition={!!feedbackLink}>
        <Then>
          <BoardEventDetailInfoRow
            icon={ClipboardList}
            label={t("adventure.feedback")}
            value={feedbackLink}
            emptyText="-"
          />
        </Then>
      </If>
    </BoardEventDetailSectionCard>
  );
}
