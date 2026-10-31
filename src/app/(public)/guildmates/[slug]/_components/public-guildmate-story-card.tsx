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
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import { getRichTextPlainText } from "@/utils/rich-text";

import PublicGuildmateStoryBanner from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-story-banner";
import PublicGuildmateStoryStatusBadge from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-story-status-badge";
import PublicGuildmateStoryTypeBadge from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-story-type-badge";
import PublicGuildmateStoryLocationBadge from "@/app/(public)/guildmates/[slug]/_components/public-guildmate-story-location-badge";
import { PUBLIC_GUILDMATE_STORY_CARD_DATE_FORMAT } from "@/app/(public)/guildmates/[slug]/_constants/public-guildmate-detail";
import type { TPublicGuildmateStoryCardProps } from "@/app/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

export default function PublicGuildmateStoryCard({
  story,
  priority = false,
}: TPublicGuildmateStoryCardProps) {
  const { t } = useT(GUILDMATES_MESSAGES);
  const { locale } = useLocale();
  // Plain text from rich text HTML; "" when empty or only images
  const descriptionText = getRichTextPlainText(story.description);
  // max_members is the number of reward slots, not a join cap: anyone can
  // keep joining, and on completion the DM rewards up to that many members.
  const rewardSlots = story.max_members;
  const creator = story.created_by;

  return (
    // h-full + flex column (Card default) + mt-auto footer keeps cards in a
    // grid row equal height
    <Card className="h-full gap-3 pt-0">
      {/* Cover image; title and game system sit on a translucent solid panel
          (no gradient overlay) so they stay legible over any banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <PublicGuildmateStoryBanner
          bannerUrl={story.banner_url}
          title={story.title}
          priority={priority}
        />

        <div className="absolute inset-x-2 top-2 flex items-start gap-2 sm:inset-x-3 sm:top-3">
          <PublicGuildmateStoryStatusBadge status={story.status} />
        </div>

        <div className="absolute inset-x-2 bottom-2 flex flex-col gap-0.5 rounded-lg border bg-background/90 px-3 py-2 sm:inset-x-3 sm:bottom-3">
          <If condition={!!story.game_system}>
            <Then>
              <span className="truncate text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {story.game_system}
              </span>
            </Then>
          </If>
          <CardTitle className="line-clamp-2 text-lg leading-tight sm:text-xl">
            <Link
              // Slug URL, falling back to the id (the API accepts both)
              href={`/stories/${story.slug || story.id}`}
              className="rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {story.title}
            </Link>
          </CardTitle>
        </div>
      </div>

      <CardContent className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <PublicGuildmateStoryTypeBadge type={story.type} />
          <PublicGuildmateStoryLocationBadge locationType={story.location_type} />
        </div>

        {/* min-h-15 = 3 lines of text-sm keeps cards in a row the same height */}
        <CardDescription className="line-clamp-3 min-h-15">
          <If condition={!!descriptionText}>
            <Then>{descriptionText}</Then>
            <Else>
              <span className="italic">{t("story.taleYetWritten")}</span>
            </Else>
          </If>
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto flex-col items-stretch gap-3 border-t">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 [&>svg]:size-3.5">
            <CalendarDays />
            {story.start_at
              ? dayjs(story.start_at)
                  .locale(locale)
                  .format(PUBLIC_GUILDMATE_STORY_CARD_DATE_FORMAT)
              : t("story.dateTba")}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-foreground [&>svg]:size-3.5">
            <Users />
            {t("story.joined", { count: story.joined_members })}
          </span>
        </div>

        {/* Always rendered (with a fallback) so every card has the same
              footer height and descriptions line up across the grid */}
        <span className="flex items-center gap-1.5 text-xs text-foreground/80 [&>svg]:size-3.5 [&>svg]:text-primary">
          <Trophy />
          {rewardSlots
            ? t("story.rewardSlots", { count: rewardSlots })
            : t("story.noPlayerLimit")}
        </span>

        <If condition={!!creator}>
          <Then>
            <Item
              variant="muted"
              size="sm"
              className="flex-nowrap rounded-sm border-primary/20 px-2.5 py-2"
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
                  {t("story.dungeonMaster")}
                </ItemDescription>
                <ItemTitle className="block w-full truncate font-heading text-sm text-foreground">
                  <Link
                    href={getGuildmateHref(creator!)}
                    className="underline-offset-4 hover:text-primary hover:underline"
                  >
                    {creator?.display_name}
                  </Link>
                </ItemTitle>
              </ItemContent>
            </Item>
          </Then>
        </If>
      </CardFooter>
    </Card>
  );
}
