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

import EventDetailSectionCard from "./event-detail-section-card";
import EventDetailInfoRow from "./event-detail-info-row";
import { EVENT_DETAIL_DATE_FORMAT } from "@/app/(authenticated)/dashboard/master/events/[id]/_constants/event-detail-date-format";
import type { TEventDetailCardProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-card-props";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

export default function EventDetailAboutCard({
  event,
  className,
}: TEventDetailCardProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const creator = event.created_by;

  return (
    <EventDetailSectionCard
      icon={Feather}
      title={t("about.title")}
      className={className}
    >
      <EventDetailInfoRow
        icon={Feather}
        label={t("about.createdBy")}
        value={
          creator?.display_name ? (
            // Avatar and name are one link to the guildmate page
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
          ) : null
        }
        emptyText={t("about.unknown")}
      />
      <EventDetailInfoRow
        icon={CalendarPlus}
        label={t("about.created")}
        value={dayjs(event.created_at)
          .locale(locale)
          .format(EVENT_DETAIL_DATE_FORMAT)}
        emptyText="-"
      />
      <EventDetailInfoRow
        icon={History}
        label={t("about.lastUpdated")}
        value={dayjs(event.updated_at)
          .locale(locale)
          .format(EVENT_DETAIL_DATE_FORMAT)}
        emptyText="-"
      />
    </EventDetailSectionCard>
  );
}
