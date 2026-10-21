import { CalendarClock, Dices, Map, Trophy, Users } from "lucide-react";

import { STORY_LOCATION_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-location-type-label";
import dayjs from "@/libs/dayjs";

import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import BoardStoryDetailInfoRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-info-row";
import { BOARD_STORY_LOCATION_TYPE_ICON } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import { BOARD_STORY_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import { formatBoardStoryReward } from "@/app/(authenticated)/dashboard/(player-board)/stories/_utils/board-story-helper";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailAdventureCard({
  story,
  className,
}: TBoardStoryDetailCardProps) {
  const partySize = story.max_members
    ? `Up to ${story.max_members} ${story.max_members === 1 ? "adventurer" : "adventurers"}`
    : null;
  // "250 EXP · 100 GP"; zero rewards are left out, null when both are 0
  const rewards =
    [
      formatBoardStoryReward(story.exp_awarded, "EXP"),
      formatBoardStoryReward(story.point_awarded, "GP"),
    ]
      .filter(Boolean)
      .join(" · ") || null;
  const startAt = story.start_at
    ? dayjs(story.start_at).format(BOARD_STORY_START_AT_FORMAT)
    : null;

  return (
    <BoardStoryDetailSectionCard
      icon={Map}
      title="Adventure Info"
      className={className}
    >
      <BoardStoryDetailInfoRow
        icon={Dices}
        label="Game System"
        value={story.game_system}
        emptyText="Any system"
      />
      <BoardStoryDetailInfoRow
        icon={Users}
        label="Party Size"
        value={partySize}
        emptyText="No limit"
      />
      <BoardStoryDetailInfoRow
        icon={Trophy}
        label="Rewards"
        value={rewards}
        emptyText="No rewards"
      />
      <BoardStoryDetailInfoRow
        icon={CalendarClock}
        label="Starts"
        value={startAt}
        emptyText="Not scheduled yet"
      />
      <BoardStoryDetailInfoRow
        icon={BOARD_STORY_LOCATION_TYPE_ICON[story.location_type]}
        label={`Location · ${STORY_LOCATION_TYPE_LABEL[story.location_type]}`}
        value={story.location_detail}
        emptyText="-"
      />
    </BoardStoryDetailSectionCard>
  );
}
