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

import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import BoardStoryDetailInfoRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-info-row";
import BoardStoryDetailExternalLink from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-external-link";
import { BOARD_STORY_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import { BOARD_STORY_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

const LOCATION_KEY = {
  [StoryLocationTypeEnum.ONLINE]: "enums.location.online",
  [StoryLocationTypeEnum.OFFLINE]: "enums.location.offline",
} as const;

export default function BoardStoryDetailAdventureCard({
  story,
  className,
}: TBoardStoryDetailCardProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const number = new Intl.NumberFormat(localeToBcp47(locale));

  const partySize = story.max_members
    ? t("adventure.partySizeValue", { count: story.max_members })
    : null;
  // "250 EXP · 100 GP"; zero rewards are left out, null when both are 0
  const rewards =
    [
      story.exp_awarded > 0
        ? t("adventure.exp", { count: number.format(story.exp_awarded) })
        : null,
      story.point_awarded > 0
        ? t("adventure.gp", { count: number.format(story.point_awarded) })
        : null,
    ]
      .filter(Boolean)
      .join(" · ") || null;
  const startAt = story.start_at
    ? dayjs(story.start_at).locale(locale).format(BOARD_STORY_START_AT_FORMAT)
    : null;

  return (
    <BoardStoryDetailSectionCard
      icon={Map}
      title={t("adventure.title")}
      className={className}
    >
      <BoardStoryDetailInfoRow
        icon={Dices}
        label={t("adventure.gameSystem")}
        value={story.game_system}
        emptyText={t("adventure.anySystem")}
      />
      <BoardStoryDetailInfoRow
        icon={Users}
        label={t("adventure.partySize")}
        value={partySize}
        emptyText={t("adventure.noLimit")}
      />
      <BoardStoryDetailInfoRow
        icon={Trophy}
        label={t("adventure.rewards")}
        value={rewards}
        emptyText={t("adventure.noRewards")}
      />
      <BoardStoryDetailInfoRow
        icon={CalendarClock}
        label={t("adventure.starts")}
        value={startAt}
        emptyText={t("adventure.notScheduled")}
      />
      <BoardStoryDetailInfoRow
        icon={BOARD_STORY_LOCATION_TYPE_ICON[story.location_type]}
        label={t("adventure.location", {
          type: t(LOCATION_KEY[story.location_type]),
        })}
        value={
          <span className="flex w-full flex-col items-start gap-1">
            {story.location_detail}
            <If condition={!!story.location_link}>
              <Then>
                <BoardStoryDetailExternalLink href={story.location_link!}>
                  {t("adventure.openMap")}
                </BoardStoryDetailExternalLink>
              </Then>
            </If>
          </span>
        }
        emptyText="-"
      />
      <If condition={!!story.discord_channel_link}>
        <Then>
          <BoardStoryDetailInfoRow
            icon={DiscordIcon}
            label={t("adventure.discord")}
            value={
              <BoardStoryDetailExternalLink href={story.discord_channel_link!}>
                {t("adventure.openDiscord")}
              </BoardStoryDetailExternalLink>
            }
            emptyText="-"
          />
        </Then>
      </If>
      <If condition={!!story.feedback_form_link}>
        <Then>
          <BoardStoryDetailInfoRow
            icon={ClipboardList}
            label={t("adventure.feedback")}
            value={
              <BoardStoryDetailExternalLink href={story.feedback_form_link!}>
                {t("adventure.openFeedback")}
              </BoardStoryDetailExternalLink>
            }
            emptyText="-"
          />
        </Then>
      </If>
    </BoardStoryDetailSectionCard>
  );
}
