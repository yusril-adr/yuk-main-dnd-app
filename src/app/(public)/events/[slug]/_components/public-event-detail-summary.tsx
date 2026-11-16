"use client";

import { CalendarDays, ClipboardList, Coins, Sparkles, Trophy } from "lucide-react";
import { If, Then } from "react-if";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { cn } from "cn";
import dayjs from "@/libs/dayjs";
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { localeToBcp47 } from "@/libs/i18n/locales";

import PublicEventJoinActions from "./public-event-join-actions";
import PublicEventDetailHost from "./public-event-detail-host";
import PublicEventDetailInfoRow from "./public-event-detail-info-row";
import PublicEventDetailExternalLink from "./public-event-detail-external-link";
import PublicEventStatusBadge from "@/app/(public)/_components/public-event-status-badge";
import { PUBLIC_EVENT_LOCATION_TYPE_ICON } from "@/app/(public)/_constants/public-event-icons";
import { PUBLIC_EVENT_START_AT_FORMAT } from "@/app/(public)/events/[slug]/_constants/public-event-detail-date-format";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import type { TPublicEventDetailProps } from "@/app/(public)/events/[slug]/_types/public-event-detail-props";

const STATUS_BADGE_KEY = {
  [EventStatusEnum.DRAFT]: "enums.status.draft",
  [EventStatusEnum.PUBLISHED]: "enums.status.published",
  [EventStatusEnum.ARCHIVED]: "enums.status.archived",
  [EventStatusEnum.CANCELLED]: "enums.status.cancelled",
  [EventStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const LOCATION_KEY = {
  [EventLocationTypeEnum.ONLINE]: "enums.location.online",
  [EventLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

// Sticky on desktop (see the page grid), stacked above the content on mobile
export default function PublicEventDetailSummary({
  event,
  className,
}: TPublicEventDetailProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const creator = event.created_by;
  const LocationIcon = PUBLIC_EVENT_LOCATION_TYPE_ICON[event.location_type];
  const numberLocale = localeToBcp47(locale);
  const exp =
    event.exp_awarded > 0
      ? t("summary.exp", {
          count: new Intl.NumberFormat(numberLocale).format(event.exp_awarded),
        })
      : null;
  const gold =
    event.point_awarded > 0
      ? t("summary.gp", {
          count: new Intl.NumberFormat(numberLocale).format(
            event.point_awarded,
          ),
        })
      : null;
  const mapLink =
    event.location_type === EventLocationTypeEnum.OFFLINE
      ? event.location_link
      : null;
  const feedbackFormLink = event.feedback_form_link;

  return (
    <Card
      role="complementary"
      aria-label={t("summary.ariaLabel")}
      className={cn(
        "gap-5 pt-0 [--card-spacing:--spacing(5)] sm:gap-6 sm:[--card-spacing:--spacing(6)]",
        className,
      )}
    >
      <CardHeader className="gap-2 border-b bg-muted/40 pt-(--card-spacing)">
        <PublicEventStatusBadge
          status={event.status}
          label={t(STATUS_BADGE_KEY[event.status])}
          className="w-fit"
        />
        <CardTitle className="text-lg sm:text-xl">{t("summary.title")}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <PublicEventDetailInfoRow
          icon={CalendarDays}
          label={t("summary.starts")}
          value={
            event.start_at
              ? dayjs(event.start_at)
                  .locale(locale)
                  .format(PUBLIC_EVENT_START_AT_FORMAT)
              : t("summary.tba")
          }
        />
        <PublicEventDetailInfoRow
          icon={Trophy}
          label={t("summary.partySize")}
          value={
            event.max_members
              ? t(
                  event.max_members === 1
                    ? "summary.partySize_one"
                    : "summary.partySize_other",
                  { count: event.max_members },
                )
              : t("summary.noLimit")
          }
        />
        <PublicEventDetailInfoRow
          icon={LocationIcon}
          label={t("summary.location", {
            type: t(LOCATION_KEY[event.location_type]),
          })}
          value={
            <span className="flex flex-col items-start gap-1">
              {event.location_detail}
              {mapLink ? (
                <PublicEventDetailExternalLink href={mapLink}>
                  {t("summary.openMap")}
                </PublicEventDetailExternalLink>
              ) : null}
            </span>
          }
        />
        {feedbackFormLink ? (
          <PublicEventDetailInfoRow
            icon={ClipboardList}
            label={t("summary.feedback")}
            value={
              <PublicEventDetailExternalLink href={feedbackFormLink}>
                {t("summary.openFeedback")}
              </PublicEventDetailExternalLink>
            }
          />
        ) : null}
      </CardContent>

      <If condition={!!exp || !!gold}>
        <Then>
          <CardContent className="grid grid-cols-2 gap-3">
            <If condition={!!exp}>
              <Then>
                <div className="flex flex-col items-center gap-1 rounded-sm border border-primary/20 bg-primary/5 p-3 text-center">
                  <Sparkles className="size-4 text-primary" />
                  <span className="font-heading text-lg">{exp}</span>
                  <span className="text-xs text-muted-foreground uppercase">
                    {t("summary.experience")}
                  </span>
                </div>
              </Then>
            </If>
            <If condition={!!gold}>
              <Then>
                <div className="flex flex-col items-center gap-1 rounded-sm border border-accent/30 bg-accent/10 p-3 text-center">
                  <Coins className="size-4 text-accent-foreground" />
                  <span className="font-heading text-lg">{gold}</span>
                  <span className="text-xs text-muted-foreground uppercase">
                    {t("summary.gold")}
                  </span>
                </div>
              </Then>
            </If>
          </CardContent>
        </Then>
      </If>

      <PublicEventJoinActions event={event} />

      <PublicEventDetailHost creator={creator} />
    </Card>
  );
}
