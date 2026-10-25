import Link from "next/link";
import {
  CalendarDays,
  ClipboardList,
  Coins,
  Gamepad2,
  Sparkles,
  Trophy,
} from "lucide-react";
import DiscordIcon from "@/assets/icons/discord.svg";
import { If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { cn } from "@/utils/cn";
import dayjs from "@/libs/dayjs";
import { getGuildmateHref, makeDefaultAvatarUrl } from "@/utils/user-helper";
import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";

import PublicStoryJoinActions from "./public-story-join-actions";
import PublicStoryDetailInfoRow from "./public-story-detail-info-row";
import PublicStoryDetailExternalLink from "./public-story-detail-external-link";
import PublicStoryStatusBadge from "@/app/(public)/stories/_components/public-story-status-badge";
import { PUBLIC_STORY_LOCATION_TYPE_ICON } from "@/app/(public)/stories/_constants/public-story-icons";
import { PUBLIC_STORY_START_AT_FORMAT } from "@/app/(public)/stories/[slug]/_constants/public-story-detail-date-format";
import type { TPublicStoryDetailProps } from "@/app/(public)/stories/[slug]/_types/public-story-detail-components-props";

function formatReward(value: number, unit: "EXP" | "GP") {
  return value > 0 ? `${value.toLocaleString("en-US")} ${unit}` : null;
}

// Sticky on desktop (see the page grid), stacked above the content on mobile
export default function PublicStoryDetailSummary({
  story,
  className,
}: TPublicStoryDetailProps) {
  const creator = story.created_by;
  const LocationIcon = PUBLIC_STORY_LOCATION_TYPE_ICON[story.location_type];
  const exp = formatReward(story.exp_awarded, "EXP");
  const gold = formatReward(story.point_awarded, "GP");

  return (
    <Card
      role="complementary"
      aria-label="Story summary"
      className={cn(
        "gap-5 pt-0 [--card-spacing:--spacing(5)] sm:gap-6 sm:[--card-spacing:--spacing(6)]",
        className,
      )}
    >
      <CardHeader className="gap-2 border-b bg-muted/40 pt-(--card-spacing)">
        <PublicStoryStatusBadge status={story.status} className="w-fit" />
        <CardTitle className="text-lg sm:text-xl">The Quest Scroll</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
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
          label="Player slots"
          // Not a join cap: anyone may join; past this many, they join as viewers
          value={
            story.max_members
              ? `Only ${story.max_members} ${story.max_members === 1 ? "hero" : "heroes"} can play. Once full, you can still join as a viewer.`
              : "No limit set"
          }
        />
        <PublicStoryDetailInfoRow
          icon={LocationIcon}
          label={`Location · ${STORY_LOCATION_TYPE_LABEL[story.location_type]}`}
          value={
            <span className="flex flex-col items-start gap-1">
              {story.location_detail}
              <If condition={!!story.location_link}>
                <Then>
                  <PublicStoryDetailExternalLink href={story.location_link!}>
                    Open location map
                  </PublicStoryDetailExternalLink>
                </Then>
              </If>
            </span>
          }
        />
        <If condition={!!story.discord_channel_link}>
          <Then>
            <PublicStoryDetailInfoRow
              icon={DiscordIcon}
              label="Discord channel"
              value={
                <PublicStoryDetailExternalLink
                  href={story.discord_channel_link!}
                >
                  Open Discord channel
                </PublicStoryDetailExternalLink>
              }
            />
          </Then>
        </If>
        <If condition={!!story.feedback_form_link}>
          <Then>
            <PublicStoryDetailInfoRow
              icon={ClipboardList}
              label="Feedback form"
              value={
                <PublicStoryDetailExternalLink
                  href={story.feedback_form_link!}
                >
                  Open feedback form
                </PublicStoryDetailExternalLink>
              }
            />
          </Then>
        </If>
        <If condition={!!story.game_system}>
          <Then>
            <PublicStoryDetailInfoRow
              icon={Gamepad2}
              label="Game system"
              value={story.game_system}
            />
          </Then>
        </If>
      </CardContent>

      <If condition={!!exp || !!gold}>
        <Then>
          <CardContent className="grid grid-cols-2 gap-3">
            <If condition={!!exp}>
              <Then>
                <div className="flex flex-col items-center gap-1 rounded-sm border border-primary/20 bg-primary/5 p-3 text-center">
                  <Sparkles className="size-4 text-primary" />
                  <span className="font-heading text-lg">{exp}</span>
                  <span className="text-xs text-muted-foreground uppercase">
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
                  <span className="text-xs text-muted-foreground uppercase">
                    Gold
                  </span>
                </div>
              </Then>
            </If>
          </CardContent>
        </Then>
      </If>

      <PublicStoryJoinActions story={story} />

      <If condition={!!creator}>
        <Then>
          <CardFooter className="-mb-(--card-spacing) gap-3 border-t bg-muted/30 py-4">
            <Avatar className="size-10 ring-2 ring-primary/30">
              <AvatarImage
                src={
                  creator?.avatar_url ??
                  makeDefaultAvatarUrl(creator?.display_name)
                }
                alt={creator?.display_name}
                loading="lazy"
              />
              <AvatarFallback>
                {creator?.display_name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">
                Dungeon Master
              </span>
              <Link
                href={getGuildmateHref(creator!)}
                className="truncate font-medium underline-offset-4 hover:text-primary hover:underline"
              >
                {creator?.display_name}
              </Link>
            </div>
          </CardFooter>
        </Then>
      </If>
    </Card>
  );
}
