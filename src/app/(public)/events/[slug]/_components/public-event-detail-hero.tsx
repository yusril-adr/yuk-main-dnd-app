"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EventStatusEnum } from "@/api/main/modules/master/events/enums/event-status";
import { EventLocationTypeEnum } from "@/api/main/modules/master/events/enums/event-location-type";
import { useT } from "@/app/_hooks/use-t";
import PublicEventBanner from "@/app/(public)/_components/public-event-banner";
import PublicEventStatusBadge from "@/app/(public)/_components/public-event-status-badge";
import PublicEventLocationBadge from "@/app/(public)/_components/public-event-location-badge";
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

// Full-bleed banner with the title laid over a gradient
export default function PublicEventDetailHero({
  event,
}: TPublicEventDetailProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);

  return (
    <section className="relative isolate h-[22rem] w-full overflow-hidden sm:h-[28rem] lg:h-[32rem]">
      <PublicEventBanner
        bannerUrl={event.banner_url}
        title={event.title}
        className="absolute inset-0 -z-20"
        priority
        iconClassName="size-24"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-black/20" />

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-4 pt-6 pb-10 sm:px-10">
        <Link
          href="/events"
          className="flex w-fit items-center gap-2 rounded-full bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:bg-background [&>svg]:size-4"
        >
          <ArrowLeft />
          {t("hero.back")}
        </Link>

        <div className="flex max-w-4xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <PublicEventStatusBadge
              status={event.status}
              label={t(STATUS_BADGE_KEY[event.status])}
            />
            <PublicEventLocationBadge
              locationType={event.location_type}
              label={t(LOCATION_KEY[event.location_type])}
              className="bg-background/70 backdrop-blur-md"
            />
          </div>
          <h1 className="font-heading text-4xl leading-tight break-words sm:text-5xl lg:text-6xl">
            {event.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
