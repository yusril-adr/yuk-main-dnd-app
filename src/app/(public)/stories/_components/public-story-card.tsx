import Link from "next/link";
import { ArrowUpRight, CalendarDays, Trophy, Users } from "lucide-react";
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
import { makeDefaultAvatarUrl } from "@/utils/user-helper";
import { getRichTextPlainText } from "@/utils/rich-text";

import PublicStoryBanner from "./public-story-banner";
import PublicStoryStatusBadge from "./public-story-status-badge";
import PublicStoryTypeBadge from "./public-story-type-badge";
import PublicStoryLocationBadge from "./public-story-location-badge";
import { PUBLIC_STORY_CARD_DATE_FORMAT } from "@/app/(public)/stories/_constants/public-story-date-format";
import type { TPublicStoryCardProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryCard({
  story,
  priority = false,
}: TPublicStoryCardProps) {
  // Plain text from rich text HTML; "" when empty or only images
  const descriptionText = getRichTextPlainText(story.description);
  // max_members is the number of reward slots, not a join cap: anyone can
  // keep joining, and on completion the DM rewards up to that many members.
  const rewardSlots = story.max_members;
  const creator = story.created_by;

  return (
    <Link
      // Slug URL, falling back to the id (the API accepts both)
      href={`/stories/${story.slug || story.id}`}
      className="group block h-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {/* h-full + flex column (Card default) + mt-auto footer keeps cards in a
          grid row equal height */}
      <Card className="h-full gap-3 pt-0 group-hover:ring-primary/40 motion-safe:transition-[box-shadow,transform] motion-safe:duration-200 sm:gap-4 sm:motion-safe:group-hover:-translate-y-0.5">
        {/* Cover image; title and game system sit on a translucent solid panel
          (no gradient overlay) so they stay legible over any banner */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <PublicStoryBanner
            bannerUrl={story.banner_url}
            title={story.title}
            priority={priority}
          />

          <div className="absolute inset-x-2 top-2 flex items-start justify-between gap-2 sm:inset-x-3 sm:top-3">
            <PublicStoryStatusBadge status={story.status} />
            <span className="hidden size-8 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 group-hover:opacity-100 sm:flex motion-safe:transition-opacity [&>svg]:size-4">
              <ArrowUpRight />
            </span>
          </div>

          <div className="absolute inset-x-2 bottom-2 flex flex-col gap-0.5 rounded-lg border bg-background/90 px-3 py-2 sm:inset-x-3 sm:bottom-3">
            <If condition={!!story.game_system}>
              <Then>
                <span className="truncate text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs">
                  {story.game_system}
                </span>
              </Then>
            </If>
            <CardTitle className="line-clamp-2 text-lg leading-tight sm:text-xl">
              {story.title}
            </CardTitle>
          </div>
        </div>

        <CardContent className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <PublicStoryTypeBadge type={story.type} />
            <PublicStoryLocationBadge locationType={story.location_type} />
          </div>

          {/* min-h-15 = 3 lines of text-sm keeps cards in a row the same height */}
          <CardDescription className="line-clamp-3 min-h-15">
            <If condition={!!descriptionText}>
              <Then>{descriptionText}</Then>
              <Else>
                <span className="italic">The tale is yet to be written…</span>
              </Else>
            </If>
          </CardDescription>
        </CardContent>

        <CardFooter className="mt-auto flex-col items-stretch gap-3 border-t">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 [&>svg]:size-3.5">
              <CalendarDays />
              {story.start_at
                ? dayjs(story.start_at).format(PUBLIC_STORY_CARD_DATE_FORMAT)
                : "Date to be proclaimed"}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-foreground [&>svg]:size-3.5">
              <Users />
              {story.joined_members} joined
            </span>
          </div>

          {/* Always rendered (with a fallback) so every card has the same
              footer height and descriptions line up across the grid */}
          <span className="flex items-center gap-1.5 text-xs text-foreground/80 [&>svg]:size-3.5 [&>svg]:text-primary">
            <Trophy />
            {rewardSlots
              ? `Only ${rewardSlots} ${rewardSlots === 1 ? "hero" : "heroes"} can play, others join as viewers`
              : "No player limit set"}
          </span>

          <If condition={!!creator}>
            <Then>
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={
                      creator?.avatar_url ??
                      makeDefaultAvatarUrl(creator?.display_name)
                    }
                    alt={creator?.display_name}
                    loading="lazy"
                  />
                  <AvatarFallback className="text-[10px]">
                    {creator?.display_name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-xs text-muted-foreground">
                  Game Master{" "}
                  <span className="font-medium text-foreground">
                    {creator?.display_name}
                  </span>
                </span>
              </div>
            </Then>
          </If>
        </CardFooter>
      </Card>
    </Link>
  );
}
