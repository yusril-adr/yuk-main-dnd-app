import { CalendarClock, Dices, Map, Trophy, Users } from "lucide-react";

import { toTitleCase } from "@/utils/format-text";
import dayjs from "@/libs/dayjs";

import StoryDetailSectionCard from "./story-detail-section-card";
import StoryDetailInfoRow from "./story-detail-info-row";
import { STORY_DETAIL_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-detail-date-format";
import { STORY_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-location-type-icon";
import { formatStoryReward } from "@/app/(authenticated)/dashboard/master/stories/_utils/story-reward";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailAdventureCard({
  story,
  className,
}: TStoryDetailCardProps) {
  const partySize = story.max_members
    ? `Up to ${story.max_members} ${story.max_members === 1 ? "adventurer" : "adventurers"}`
    : null;
  // "250 XP · 100 GP"; zero rewards are left out, null when both are 0
  const rewards =
    [
      formatStoryReward(story.exp_awarded, "XP"),
      formatStoryReward(story.point_awarded, "GP"),
    ]
      .filter(Boolean)
      .join(" · ") || null;
  const startAt = story.start_at
    ? dayjs(story.start_at).format(STORY_DETAIL_START_AT_FORMAT)
    : null;

  return (
    <StoryDetailSectionCard
      icon={Map}
      title="Adventure Info"
      className={className}
    >
      <StoryDetailInfoRow
        icon={Dices}
        label="Game System"
        value={story.game_system}
        emptyText="Any system"
      />
      <StoryDetailInfoRow
        icon={Users}
        label="Party Size"
        value={partySize}
        emptyText="No limit"
      />
      <StoryDetailInfoRow
        icon={Trophy}
        label="Rewards"
        value={rewards}
        emptyText="No rewards"
      />
      <StoryDetailInfoRow
        icon={CalendarClock}
        label="Starts"
        value={startAt}
        emptyText="Not scheduled yet"
      />
      <StoryDetailInfoRow
        icon={STORY_LOCATION_TYPE_ICON[story.location_type]}
        label={`Location · ${toTitleCase(story.location_type)}`}
        value={story.location_detail}
        emptyText="-"
      />
    </StoryDetailSectionCard>
  );
}
