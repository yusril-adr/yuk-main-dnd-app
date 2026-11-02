"use client";

import {
  CalendarClock,
  ClipboardList,
  Dices,
  Map,
  Trophy,
  Users,
} from "lucide-react";
import DiscordIcon from "@/assets/icons/discord.svg";
import { If, Then } from "react-if";

import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import dayjs from "@/libs/dayjs";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";

import StoryDetailSectionCard from "./story-detail-section-card";
import StoryDetailInfoRow from "./story-detail-info-row";
import StoryDetailExternalLink from "./story-detail-external-link";
import { STORY_DETAIL_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-detail-date-format";
import { STORY_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-location-type-icon";
import { formatStoryReward } from "@/app/(authenticated)/dashboard/master/stories/_utils/story-reward";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

const LOCATION_KEY = {
  [StoryLocationTypeEnum.ONLINE]: "enums.location.online",
  [StoryLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function StoryDetailAdventureCard({
  story,
  className,
}: TStoryDetailCardProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const bcp47 = localeToBcp47(locale);
  const partySize = story.max_members
    ? t("adventure.partySizeValue", { count: story.max_members })
    : null;
  // "250 EXP · 100 GP"; zero rewards are left out, null when both are 0
  const rewards =
    [
      formatStoryReward(story.exp_awarded, "EXP", bcp47),
      formatStoryReward(story.point_awarded, "GP", bcp47),
    ]
      .filter(Boolean)
      .join(" · ") || null;
  const startAt = story.start_at
    ? dayjs(story.start_at).locale(locale).format(STORY_DETAIL_START_AT_FORMAT)
    : null;

  return (
    <StoryDetailSectionCard
      icon={Map}
      title={t("adventure.title")}
      className={className}
    >
      <StoryDetailInfoRow
        icon={Dices}
        label={t("adventure.gameSystem")}
        value={story.game_system}
        emptyText={t("adventure.anySystem")}
      />
      <StoryDetailInfoRow
        icon={Users}
        label={t("adventure.partySize")}
        value={partySize}
        emptyText={t("adventure.noLimit")}
      />
      <StoryDetailInfoRow
        icon={Trophy}
        label={t("adventure.rewards")}
        value={rewards}
        emptyText={t("adventure.noRewards")}
      />
      <StoryDetailInfoRow
        icon={CalendarClock}
        label={t("adventure.starts")}
        value={startAt}
        emptyText={t("adventure.notScheduled")}
      />
      <StoryDetailInfoRow
        icon={STORY_LOCATION_TYPE_ICON[story.location_type]}
        label={t("adventure.location", {
          type: t(LOCATION_KEY[story.location_type]),
        })}
        value={
          <span className="flex w-full flex-col items-start gap-1">
            {story.location_detail}
            <If condition={!!story.location_link}>
              <Then>
                <StoryDetailExternalLink href={story.location_link!}>
                  {t("adventure.openMap")}
                </StoryDetailExternalLink>
              </Then>
            </If>
          </span>
        }
        emptyText="-"
      />
      <If condition={!!story.discord_channel_link}>
        <Then>
          <StoryDetailInfoRow
            icon={DiscordIcon}
            label={t("adventure.discord")}
            value={
              <StoryDetailExternalLink href={story.discord_channel_link!}>
                {t("adventure.openDiscord")}
              </StoryDetailExternalLink>
            }
            emptyText="-"
          />
        </Then>
      </If>
      <If condition={!!story.feedback_form_link}>
        <Then>
          <StoryDetailInfoRow
            icon={ClipboardList}
            label={t("adventure.feedback")}
            value={
              <StoryDetailExternalLink href={story.feedback_form_link!}>
                {t("adventure.openFeedback")}
              </StoryDetailExternalLink>
            }
            emptyText="-"
          />
        </Then>
      </If>
    </StoryDetailSectionCard>
  );
}
