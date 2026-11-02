"use client";

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
import { cn } from "cn";
import dayjs from "@/libs/dayjs";
import { getGuildmateHref, makeDefaultAvatarUrl } from "@/utils/user-helper";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { localeToBcp47 } from "@/libs/i18n/locales";

import PublicStoryJoinActions from "./public-story-join-actions";
import PublicStoryDetailInfoRow from "./public-story-detail-info-row";
import PublicStoryDetailExternalLink from "./public-story-detail-external-link";
import PublicStoryStatusBadge from "@/app/(public)/stories/_components/public-story-status-badge";
import { PUBLIC_STORY_LOCATION_TYPE_ICON } from "@/app/(public)/stories/_constants/public-story-icons";
import { PUBLIC_STORY_START_AT_FORMAT } from "@/app/(public)/stories/[slug]/_constants/public-story-detail-date-format";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryDetailProps } from "@/app/(public)/stories/[slug]/_types/public-story-detail-props";

const STATUS_BADGE_KEY = {
  [StoryStatusEnum.DRAFT]: "enums.status.draft",
  [StoryStatusEnum.PUBLISHED]: "enums.status.recruiting",
  [StoryStatusEnum.ARCHIVED]: "enums.status.archived",
  [StoryStatusEnum.CANCELLED]: "enums.status.cancelled",
  [StoryStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const LOCATION_KEY = {
  [StoryLocationTypeEnum.ONLINE]: "enums.location.online",
  [StoryLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

// Sticky on desktop (see the page grid), stacked above the content on mobile
export default function PublicStoryDetailSummary({
  story,
  className,
}: TPublicStoryDetailProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const creator = story.created_by;
  const LocationIcon = PUBLIC_STORY_LOCATION_TYPE_ICON[story.location_type];
  const numberLocale = localeToBcp47(locale);
  const exp =
    story.exp_awarded > 0
      ? t("summary.exp", {
          count: new Intl.NumberFormat(numberLocale).format(story.exp_awarded),
        })
      : null;
  const gold =
    story.point_awarded > 0
      ? t("summary.gp", {
          count: new Intl.NumberFormat(numberLocale).format(
            story.point_awarded,
          ),
        })
      : null;

  return (
    <Card
      role="complementary"
      aria-label={t("summary.ariaLabel")}
      className={cn(
        "gap-5 pt-0 [--card-spacing:--spacing(5)] sm:gap-6 sm:[--card-spacing:--spacing(6)]",
        className,
      )}
    >
      <CardHeader className="gap-2 border-b bg-muted/40 pt-(--card-spacing)">
        <PublicStoryStatusBadge
          status={story.status}
          label={t(STATUS_BADGE_KEY[story.status])}
          className="w-fit"
        />
        <CardTitle className="text-lg sm:text-xl">{t("summary.title")}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <PublicStoryDetailInfoRow
          icon={CalendarDays}
          label={t("summary.starts")}
          value={
            story.start_at
              ? dayjs(story.start_at)
                  .locale(locale)
                  .format(PUBLIC_STORY_START_AT_FORMAT)
              : t("summary.tba")
          }
        />
        <PublicStoryDetailInfoRow
          icon={Trophy}
          label={t("summary.playerSlots")}
          // Not a join cap: anyone may join; past this many, they join as viewers
          value={
            story.max_members
              ? t(
                  story.max_members === 1
                    ? "summary.rewardSlots_one"
                    : "summary.rewardSlots_other",
                  { count: story.max_members },
                )
              : t("summary.noLimit")
          }
        />
        <PublicStoryDetailInfoRow
          icon={LocationIcon}
          label={t("summary.location", {
            type: t(LOCATION_KEY[story.location_type]),
          })}
          value={
            <span className="flex flex-col items-start gap-1">
              {story.location_detail}
              <If condition={!!story.location_link}>
                <Then>
                  <PublicStoryDetailExternalLink href={story.location_link!}>
                    {t("summary.openMap")}
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
              label={t("summary.discord")}
              value={
                <PublicStoryDetailExternalLink
                  href={story.discord_channel_link!}
                >
                  {t("summary.openDiscord")}
                </PublicStoryDetailExternalLink>
              }
            />
          </Then>
        </If>
        <If condition={!!story.feedback_form_link}>
          <Then>
            <PublicStoryDetailInfoRow
              icon={ClipboardList}
              label={t("summary.feedback")}
              value={
                <PublicStoryDetailExternalLink
                  href={story.feedback_form_link!}
                >
                  {t("summary.openFeedback")}
                </PublicStoryDetailExternalLink>
              }
            />
          </Then>
        </If>
        <If condition={!!story.game_system}>
          <Then>
            <PublicStoryDetailInfoRow
              icon={Gamepad2}
              label={t("summary.gameSystem")}
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
                    {t("summary.experience")}
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
                    {t("summary.gold")}
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
                {t("summary.dungeonMaster")}
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
