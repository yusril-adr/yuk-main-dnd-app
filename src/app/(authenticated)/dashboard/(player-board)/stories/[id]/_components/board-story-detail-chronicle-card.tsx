import Link from "next/link";
import { CalendarPlus, Feather, History } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";
import dayjs from "@/libs/dayjs";

import BoardStoryDetailSectionCard from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-section-card";
import BoardStoryDetailInfoRow from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-info-row";
import { BOARD_STORY_DATE_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailChronicleCard({
  story,
  className,
}: TBoardStoryDetailCardProps) {
  const creator = story.created_by;

  return (
    <BoardStoryDetailSectionCard
      icon={Feather}
      title="Chronicle"
      className={className}
    >
      <BoardStoryDetailInfoRow
        icon={Feather}
        label="Written By"
        value={
          creator?.display_name && (
            <span className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarImage
                  src={
                    creator.avatar_url ??
                    makeDefaultAvatarUrl(creator.display_name)
                  }
                  alt={creator.display_name}
                />
                <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
                  {getInitials(creator.display_name)}
                </AvatarFallback>
              </Avatar>
              {/* The board creator has no username; guildmate pages accept the id */}
              <Link
                href={`/guildmates/${encodeURIComponent(creator.id)}`}
                className="min-w-0 truncate text-primary underline-offset-4 hover:underline"
              >
                {creator.display_name}
              </Link>
            </span>
          )
        }
        emptyText="Unknown"
      />
      <BoardStoryDetailInfoRow
        icon={CalendarPlus}
        label="Recorded"
        value={dayjs(story.created_at).format(BOARD_STORY_DATE_FORMAT)}
        emptyText="-"
      />
      <BoardStoryDetailInfoRow
        icon={History}
        label="Last Updated"
        value={
          story.updated_at
            ? dayjs(story.updated_at).format(BOARD_STORY_DATE_FORMAT)
            : null
        }
        emptyText="-"
      />
    </BoardStoryDetailSectionCard>
  );
}
