"use client";

import Link from "next/link";
import { CalendarDays, Crown, Trophy, Users } from "lucide-react";
import { Else, If, Then } from "react-if";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import dayjs from "@/libs/dayjs";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import { getRichTextPlainText } from "@/utils/rich-text";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import PublicStoryBanner from "@/app/(public)/_components/public-story-banner";
import PublicStoryStatusBadge from "@/app/(public)/_components/public-story-status-badge";
import PublicStoryTypeBadge from "@/app/(public)/_components/public-story-type-badge";
import PublicStoryLocationBadge from "@/app/(public)/_components/public-story-location-badge";
import { PUBLIC_STORY_CARD_DATE_FORMAT } from "@/app/(public)/_constants/public-story-card";
import { PUBLIC_STORY_CARD_MESSAGES } from "@/app/(public)/_messages/story-card";
import type { TPublicStoryCardProps } from "@/app/(public)/_types/public-story-card-props";

const STATUS_BADGE_KEY = {
  [StoryStatusEnum.DRAFT]: "enums.status.draft",
  [StoryStatusEnum.PUBLISHED]: "enums.status.published",
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

export default function PublicStoryCard({
  story,
  priority = false,
}: TPublicStoryCardProps) {
  const { t } = useT(PUBLIC_STORY_CARD_MESSAGES);
  const { locale } = useLocale();
  // Plain text from rich text HTML; "" when empty or only images
  const descriptionText = getRichTextPlainText(story.description);
  // max_members is the number of reward slots, not a join cap: anyone can
  // keep joining, and on completion the DM rewards up to that many members.
  const rewardSlots = story.max_members;
  const creator = story.created_by;

  // Slug URL, falling back to the id (the API accepts both)
  const storyHref = `/stories/${story.slug || story.id}`;

  return (
    // YouTube-style card: whole card hits story detail; only the DM block
    // hits the guildmate. h-full + flex column + mt-auto footer keeps a grid
    // row equal height.
    <Card className="group relative h-full gap-3 pt-0 transition-[background-color,box-shadow] hover:bg-muted/40 hover:shadow-md has-focus-visible:ring-2 has-focus-visible:ring-ring">
      <Link
        href={storyHref}
        aria-label={story.title}
        className="absolute inset-0 z-0 rounded-[inherit] focus-visible:outline-none"
      />

      {/* Cover image; title and game system sit on a translucent solid panel
          (no gradient overlay) so they stay legible over any banner.
          pointer-events-none lets clicks reach the stretched story link. */}
      <div className="pointer-events-none relative aspect-[16/10] overflow-hidden bg-muted">
        <PublicStoryBanner
          bannerUrl={story.banner_url}
          title={story.title}
          priority={priority}
        />

        <div className="absolute inset-x-2 top-2 flex items-start gap-2 sm:inset-x-3 sm:top-3">
          <PublicStoryStatusBadge
            status={story.status}
            label={t(STATUS_BADGE_KEY[story.status])}
          />
        </div>

        <div className="absolute inset-x-2 bottom-2 flex flex-col gap-0.5 rounded-lg border bg-background/90 px-3 py-2 sm:inset-x-3 sm:bottom-3">
          <If condition={!!story.game_system}>
            <Then>
              <span className="truncate text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {story.game_system}
              </span>
            </Then>
          </If>
          <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-primary sm:text-xl">
            {story.title}
          </CardTitle>
        </div>
      </div>

      <CardContent className="pointer-events-none flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <PublicStoryTypeBadge
            type={story.type}
            label={t(TYPE_KEY[story.type])}
          />
          <PublicStoryLocationBadge
            locationType={story.location_type}
            label={t(LOCATION_KEY[story.location_type])}
          />
        </div>

        {/* min-h-18 = 3 lines of text-base keeps cards in a row the same height */}
        <CardDescription className="line-clamp-3 min-h-18 text-base">
          <If condition={!!descriptionText}>
            <Then>{descriptionText}</Then>
            <Else>
              <span className="italic">{t("taleYetWritten")}</span>
            </Else>
          </If>
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto flex-col items-stretch gap-3 border-t">
        <div className="pointer-events-none flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 [&>svg]:size-3.5">
            <CalendarDays />
            {story.start_at
              ? dayjs(story.start_at)
                  .locale(locale)
                  .format(PUBLIC_STORY_CARD_DATE_FORMAT)
              : t("dateTba")}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-foreground [&>svg]:size-3.5">
            <Users />
            {t("joined", { count: story.joined_members })}
          </span>
        </div>

        {/* Always rendered (with a fallback) so every card has the same
              footer height and descriptions line up across the grid */}
        <span className="pointer-events-none flex items-center gap-1.5 text-xs text-foreground/80 [&>svg]:size-3.5 [&>svg]:text-primary">
          <Trophy />
          {rewardSlots
            ? t("rewardSlots", { count: rewardSlots })
            : t("noPlayerLimit")}
        </span>

        <If condition={!!creator}>
          <Then>
            {/* z-10 above the stretched story link — YouTube channel chip */}
            <Item
              variant="muted"
              size="sm"
              render={<Link href={getGuildmateHref(creator!)} />}
              className="relative z-10 flex-nowrap rounded-sm border-primary/20 px-2.5 py-2 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ItemMedia>
                <Avatar className="size-9 border-2 border-primary/40">
                  <AvatarImage
                    src={
                      creator?.avatar_url ??
                      makeDefaultAvatarUrl(creator?.display_name)
                    }
                    alt={creator?.display_name}
                    loading="lazy"
                    className="object-cover"
                  />
                  <AvatarFallback className="font-heading text-sm">
                    {getInitials(creator?.display_name ?? "")}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="min-w-0 gap-0">
                <ItemDescription className="flex items-center gap-1 text-xs font-medium tracking-widest text-primary uppercase [&>svg]:size-3">
                  <Crown />
                  {t("dungeonMaster")}
                </ItemDescription>
                <ItemTitle className="block w-full truncate font-heading text-sm text-foreground underline-offset-4 group-hover/item:text-primary group-hover/item:underline">
                  {creator?.display_name}
                </ItemTitle>
              </ItemContent>
            </Item>
          </Then>
        </If>
      </CardFooter>
    </Card>
  );
}
