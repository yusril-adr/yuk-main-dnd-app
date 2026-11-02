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

import StoryDetailSectionCard from "./story-detail-section-card";
import StoryDetailInfoRow from "./story-detail-info-row";
import { STORY_DETAIL_DATE_FORMAT } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-detail-date-format";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

export default function StoryDetailChronicleCard({
  story,
  className,
}: TStoryDetailCardProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const creator = story.created_by;

  return (
    <StoryDetailSectionCard
      icon={Feather}
      title={t("chronicle.title")}
      className={className}
    >
      <StoryDetailInfoRow
        icon={Feather}
        label={t("chronicle.writtenBy")}
        value={
          creator?.display_name && (
            <span className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarImage
                  src={
                    creator?.avatar_url ??
                    makeDefaultAvatarUrl(creator?.display_name)
                  }
                  alt={creator?.display_name || "-"}
                />
                <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
                  {getInitials(creator?.display_name)}
                </AvatarFallback>
              </Avatar>
              <Link
                href={getGuildmateHref(creator)}
                className="min-w-0 truncate text-primary underline-offset-4 hover:underline"
              >
                {creator?.display_name}
              </Link>
            </span>
          )
        }
        emptyText={t("chronicle.unknown")}
      />
      <StoryDetailInfoRow
        icon={CalendarPlus}
        label={t("chronicle.recorded")}
        value={dayjs(story.created_at)
          .locale(locale)
          .format(STORY_DETAIL_DATE_FORMAT)}
        emptyText="-"
      />
      <StoryDetailInfoRow
        icon={History}
        label={t("chronicle.lastUpdated")}
        value={dayjs(story.updated_at)
          .locale(locale)
          .format(STORY_DETAIL_DATE_FORMAT)}
        emptyText="-"
      />
    </StoryDetailSectionCard>
  );
}
