"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { If, Then } from "react-if";

import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { useT } from "@/app/_hooks/use-t";
import PublicStoryBanner from "@/app/(public)/stories/_components/public-story-banner";
import PublicStoryStatusBadge from "@/app/(public)/stories/_components/public-story-status-badge";
import PublicStoryTypeBadge from "@/app/(public)/stories/_components/public-story-type-badge";
import PublicStoryLocationBadge from "@/app/(public)/stories/_components/public-story-location-badge";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryDetailProps } from "@/app/(public)/stories/[slug]/_types/public-story-detail-props";

const STATUS_BADGE_KEY = {
  [StoryStatusEnum.DRAFT]: "enums.status.draft",
  [StoryStatusEnum.PUBLISHED]: "enums.status.recruiting",
  [StoryStatusEnum.ARCHIVED]: "enums.status.archived",
  [StoryStatusEnum.CANCELLED]: "enums.status.cancelled",
  [StoryStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const TYPE_KEY = {
  [StoryTypeEnum.ONESHOT]: "enums.type.oneshot",
  [StoryTypeEnum.CAMPAIGN]: "enums.type.campaign",
} as const;

const LOCATION_KEY = {
  [StoryLocationTypeEnum.ONLINE]: "enums.location.online",
  [StoryLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

// Full-bleed banner with the title laid over a gradient
export default function PublicStoryDetailHero({
  story,
}: TPublicStoryDetailProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);

  return (
    <section className="relative isolate h-[22rem] w-full overflow-hidden sm:h-[28rem] lg:h-[32rem]">
      <PublicStoryBanner
        bannerUrl={story.banner_url}
        title={story.title}
        className="absolute inset-0 -z-20"
        priority
        iconClassName="size-24"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-black/20" />

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-4 pt-6 pb-10 sm:px-10">
        <Link
          href="/stories"
          className="flex w-fit items-center gap-2 rounded-full bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:bg-background [&>svg]:size-4"
        >
          <ArrowLeft />
          {t("hero.back")}
        </Link>

        <div className="flex max-w-4xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <PublicStoryStatusBadge
              status={story.status}
              label={t(STATUS_BADGE_KEY[story.status])}
            />
            <PublicStoryTypeBadge
              type={story.type}
              label={t(TYPE_KEY[story.type])}
            />
            <PublicStoryLocationBadge
              locationType={story.location_type}
              label={t(LOCATION_KEY[story.location_type])}
              className="bg-background/70 backdrop-blur-md"
            />
          </div>
          <If condition={!!story.game_system}>
            <Then>
              <span className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
                {story.game_system}
              </span>
            </Then>
          </If>
          <h1 className="font-heading text-4xl leading-tight break-words sm:text-5xl lg:text-6xl">
            {story.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
