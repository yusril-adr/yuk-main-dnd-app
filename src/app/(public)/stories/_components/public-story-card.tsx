import Link from "next/link";
import { ArrowUpRight, CalendarDays, Trophy, Users } from "lucide-react";
import { Else, If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import dayjs from "@/libs/dayjs";
import { getRichTextPlainText } from "@/utils/rich-text";

import PublicStoryBanner from "./public-story-banner";
import PublicStoryStatusBadge from "./public-story-status-badge";
import PublicStoryTypeBadge from "./public-story-type-badge";
import PublicStoryLocationBadge from "./public-story-location-badge";
import { PUBLIC_STORY_CARD_DATE_FORMAT } from "@/app/(public)/stories/_constants/public-story-date-format";
import type { TPublicStoryCardProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryCard({ story }: TPublicStoryCardProps) {
  // Plain text from rich text HTML; "" when empty or only images
  const descriptionText = getRichTextPlainText(story.description);
  // max_members is the number of reward slots, not a join cap: anyone can
  // keep joining, and on completion the DM rewards up to that many members.
  const rewardSlots = story.max_members;
  const creator = story.created_by;

  return (
    <Link
      href={`/stories/${story.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/40 motion-safe:transition-[border-color,transform] motion-safe:duration-200 sm:motion-safe:hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {/* Cover image; title and game system sit on a translucent solid panel
          (no gradient overlay) so they stay legible over any banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <PublicStoryBanner bannerUrl={story.banner_url} title={story.title} />

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
          <h3 className="line-clamp-2 font-heading text-lg leading-tight text-foreground sm:text-xl">
            {story.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <PublicStoryTypeBadge type={story.type} />
          <PublicStoryLocationBadge locationType={story.location_type} />
        </div>

        {/* min-h-15 = 3 lines of text-sm keeps cards in a row the same height */}
        <p className="line-clamp-3 min-h-15 text-sm text-muted-foreground">
          <If condition={!!descriptionText}>
            <Then>{descriptionText}</Then>
            <Else>
              <span className="italic">The tale is yet to be written…</span>
            </Else>
          </If>
        </p>

        <div className="mt-auto flex flex-col gap-3 border-t pt-4">
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
              ? `Up to ${rewardSlots} ${rewardSlots === 1 ? "hero" : "heroes"} rewarded`
              : "No reward limit set"}
          </span>

          <If condition={!!creator}>
            <Then>
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={creator?.avatar_url ?? undefined}
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
        </div>
      </div>
    </Link>
  );
}
