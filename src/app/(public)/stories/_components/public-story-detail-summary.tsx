import { CalendarDays, Coins, Gamepad2, Sparkles, Trophy } from "lucide-react";
import { If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { cn } from "@/utils/cn";
import dayjs from "@/libs/dayjs";
import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";

import PublicStoryJoinActions from "./public-story-join-actions";
import PublicStoryDetailInfoRow from "./public-story-detail-info-row";
import PublicStoryStatusBadge from "./public-story-status-badge";
import { PUBLIC_STORY_LOCATION_TYPE_ICON } from "@/app/(public)/stories/_constants/public-story-icons";
import { PUBLIC_STORY_START_AT_FORMAT } from "@/app/(public)/stories/_constants/public-story-date-format";
import type { TPublicStoryDetailProps } from "@/app/(public)/stories/_types/public-story-components-props";

function formatReward(value: number, unit: "XP" | "GP") {
  return value > 0 ? `${value.toLocaleString("en-US")} ${unit}` : null;
}

// Sticky on desktop (see the page grid), stacked above the content on mobile
export default function PublicStoryDetailSummary({
  story,
  className,
}: TPublicStoryDetailProps) {
  const creator = story.created_by;
  const LocationIcon = PUBLIC_STORY_LOCATION_TYPE_ICON[story.location_type];
  const exp = formatReward(story.exp_awarded, "XP");
  const gold = formatReward(story.point_awarded, "GP");

  return (
    <aside
      className={cn(
        "flex flex-col gap-5 overflow-hidden sm:gap-6 rounded-md border bg-card",
        className,
      )}
    >
      <div className="flex flex-col gap-2 border-b bg-muted/40 p-5 sm:p-6">
        <PublicStoryStatusBadge status={story.status} className="w-fit" />
        <p className="font-heading text-lg sm:text-xl">The Quest Scroll</p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-1">
        <PublicStoryDetailInfoRow
          icon={CalendarDays}
          label="Starts"
          value={
            story.start_at
              ? dayjs(story.start_at).format(PUBLIC_STORY_START_AT_FORMAT)
              : "To be announced"
          }
        />
        <PublicStoryDetailInfoRow
          icon={Trophy}
          label="Reward slots"
          // Not a join cap: anyone may join; the DM rewards up to this many
          value={
            story.max_members
              ? `Up to ${story.max_members} ${story.max_members === 1 ? "hero" : "heroes"} rewarded`
              : "No limit set"
          }
        />
        <PublicStoryDetailInfoRow
          icon={LocationIcon}
          label={`Location · ${STORY_LOCATION_TYPE_LABEL[story.location_type]}`}
          value={story.location_detail}
        />
        <If condition={!!story.game_system}>
          <Then>
            <PublicStoryDetailInfoRow
              icon={Gamepad2}
              label="Game system"
              value={story.game_system}
            />
          </Then>
        </If>
      </div>

      <If condition={!!exp || !!gold}>
        <Then>
          <div className="mx-5 grid grid-cols-2 gap-3 sm:mx-6">
            <If condition={!!exp}>
              <Then>
                <div className="flex flex-col items-center gap-1 rounded-sm border border-primary/20 bg-primary/5 p-3 text-center">
                  <Sparkles className="size-4 text-primary" />
                  <span className="font-heading text-lg">{exp}</span>
                  <span className="text-[11px] text-muted-foreground uppercase">
                    Experience
                  </span>
                </div>
              </Then>
            </If>
            <If condition={!!gold}>
              <Then>
                <div className="flex flex-col items-center gap-1 rounded-sm border border-accent/30 bg-accent/10 p-3 text-center">
                  <Coins className="size-4 text-accent-foreground" />
                  <span className="font-heading text-lg">{gold}</span>
                  <span className="text-[11px] text-muted-foreground uppercase">
                    Gold
                  </span>
                </div>
              </Then>
            </If>
          </div>
        </Then>
      </If>

      <PublicStoryJoinActions story={story} />

      <If condition={!!creator}>
        <Then>
          <div className="flex items-center gap-3 border-t bg-muted/30 px-5 py-4 sm:px-6">
            <Avatar className="size-10 ring-2 ring-primary/30">
              <AvatarImage
                src={creator?.avatar_url ?? undefined}
                alt={creator?.display_name}
                loading="lazy"
              />
              <AvatarFallback>
                {creator?.display_name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">Game Master</span>
              <span className="truncate font-medium">
                {creator?.display_name}
              </span>
            </div>
          </div>
        </Then>
      </If>
    </aside>
  );
}
