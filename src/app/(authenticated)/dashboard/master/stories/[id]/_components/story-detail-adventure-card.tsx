import { CalendarClock, Dices, Map, Users } from "lucide-react";

import { toTitleCase } from "@/utils/format-text";
import dayjs from "@/libs/dayjs";

import StoryDetailSectionCard from "./story-detail-section-card";
import StoryDetailInfoRow from "./story-detail-info-row";
import { STORY_DETAIL_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-detail-date-format";
import { STORY_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-location-type-icon";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailAdventureCard({
  story,
  className,
}: TStoryDetailCardProps) {
  const partySize = story.max_members
    ? `Up to ${story.max_members} ${story.max_members === 1 ? "adventurer" : "adventurers"}`
    : null;
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
