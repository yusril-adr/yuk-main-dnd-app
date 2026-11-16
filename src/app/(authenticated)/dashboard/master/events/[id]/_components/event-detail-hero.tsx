"use client";

import { If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";

import EventCardBanner from "@/app/(authenticated)/dashboard/master/events/_components/event-card-banner";
import EventStatusBadge from "@/app/(authenticated)/dashboard/master/events/_components/event-status-badge";
import EventDetailSlug from "@/app/(authenticated)/dashboard/master/events/[id]/_components/event-detail-slug";
import { EVENT_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/events/[id]/_constants/event-location-type-icon";
import { formatEventReward } from "@/app/(authenticated)/dashboard/master/events/_utils/event-reward";
import type { TEventDetailCardProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-card-props";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

const STATUS_KEY = {
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

export default function EventDetailHero({ event }: TEventDetailCardProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const bcp47 = localeToBcp47(locale);
  const LocationIcon = EVENT_LOCATION_TYPE_ICON[event.location_type];
  const expReward = formatEventReward(event.exp_awarded, "EXP", bcp47);
  const goldReward = formatEventReward(event.point_awarded, "GP", bcp47);

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* Fixed responsive height with a center crop, like the master story
          detail banner, so any image ratio fills the strip */}
      <EventCardBanner
        bannerUrl={event.banner_url}
        title={event.title}
        imageClassName="h-56 max-h-none object-cover sm:h-72 lg:h-80"
        placeholderClassName="aspect-auto h-56 sm:h-72 lg:h-80"
      />

      <div className="flex flex-col gap-2 border-t p-6">
        <h2 className="font-heading text-2xl font-medium leading-tight break-words sm:text-3xl">
          {event.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <EventStatusBadge
            status={event.status}
            label={t(STATUS_KEY[event.status])}
          />
          <Badge variant="outline" className="gap-1 [&>svg]:size-3">
            <LocationIcon />
            {t(LOCATION_KEY[event.location_type])}
          </Badge>
          <EventDetailSlug slug={event.slug} />
          <If condition={!!expReward}>
            <Then>
              <Badge variant="outline">{expReward}</Badge>
            </Then>
          </If>
          <If condition={!!goldReward}>
            <Then>
              <Badge variant="outline">{goldReward}</Badge>
            </Then>
          </If>
        </div>
      </div>
    </Card>
  );
}
