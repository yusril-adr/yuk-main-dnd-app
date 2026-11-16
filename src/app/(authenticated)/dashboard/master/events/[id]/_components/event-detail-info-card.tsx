"use client";

import { CalendarClock, ClipboardList, Map, Trophy, Users } from "lucide-react";
import { If, Then } from "react-if";

import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import dayjs from "@/libs/dayjs";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";

import EventDetailSectionCard from "./event-detail-section-card";
import EventDetailInfoRow from "./event-detail-info-row";
import EventDetailExternalLink from "./event-detail-external-link";
import { EVENT_DETAIL_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/master/events/[id]/_constants/event-detail-date-format";
import { EVENT_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/events/[id]/_constants/event-location-type-icon";
import { formatEventReward } from "@/app/(authenticated)/dashboard/master/events/_utils/event-reward";
import type { TEventDetailCardProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-card-props";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

const LOCATION_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function EventDetailInfoCard({
  event,
  className,
}: TEventDetailCardProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const bcp47 = localeToBcp47(locale);
  const partySize = event.max_members
    ? t("info.partySizeValue", { count: event.max_members })
    : null;
  // "250 EXP · 100 GP"; zero rewards are left out, null when both are 0
  const rewards =
    [
      formatEventReward(event.exp_awarded, "EXP", bcp47),
      formatEventReward(event.point_awarded, "GP", bcp47),
    ]
      .filter(Boolean)
      .join(" · ") || null;
  const startAt = event.start_at
    ? dayjs(event.start_at).locale(locale).format(EVENT_DETAIL_START_AT_FORMAT)
    : null;
  const locationLink = event.location_link;
  const feedbackFormLink = event.feedback_form_link;

  return (
    <EventDetailSectionCard
      icon={Map}
      title={t("info.title")}
      className={className}
    >
      <EventDetailInfoRow
        icon={Users}
        label={t("info.partySize")}
        value={partySize}
        emptyText={t("info.noLimit")}
      />
      <EventDetailInfoRow
        icon={Trophy}
        label={t("info.rewards")}
        value={rewards}
        emptyText={t("info.noRewards")}
      />
      <EventDetailInfoRow
        icon={CalendarClock}
        label={t("info.starts")}
        value={startAt}
        emptyText={t("info.notScheduled")}
      />
      <EventDetailInfoRow
        icon={EVENT_LOCATION_TYPE_ICON[event.location_type]}
        label={t("info.location", {
          type: t(LOCATION_KEY[event.location_type]),
        })}
        value={
          <span className="flex w-full flex-col items-start gap-1">
            {event.location_detail}
            <If condition={!!locationLink}>
              <Then>
                <EventDetailExternalLink href={locationLink ?? ""}>
                  {t("info.openMap")}
                </EventDetailExternalLink>
              </Then>
            </If>
          </span>
        }
        emptyText="-"
      />
      <If condition={!!feedbackFormLink}>
        <Then>
          <EventDetailInfoRow
            icon={ClipboardList}
            label={t("info.feedback")}
            value={
              <EventDetailExternalLink href={feedbackFormLink ?? ""}>
                {t("info.openFeedback")}
              </EventDetailExternalLink>
            }
            emptyText="-"
          />
        </Then>
      </If>
    </EventDetailSectionCard>
  );
}
