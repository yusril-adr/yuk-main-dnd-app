import Link from "next/link";
import { CalendarDays, Crown, Users } from "lucide-react";

import dayjs from "@/libs/dayjs";

import BoardStoryBanner from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-banner";
import BoardStoryStatusBadge from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-status-badge";
import BoardStoryMemberStatusBadge from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-member-status-badge";
import { BOARD_STORY_START_AT_FORMAT } from "@/app/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import {
  formatBoardStoryMembers,
  getBoardStoryHref,
} from "@/app/(authenticated)/dashboard/(player-board)/stories/_utils/board-story-helper";
import type { TBoardStoryCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

export default function BoardStoryCard({ story }: TBoardStoryCardProps) {
  return (
    <Link
      href={getBoardStoryHref(story.id)}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden border-b">
        <BoardStoryBanner bannerUrl={story.banner_url} title={story.title} />
        <BoardStoryStatusBadge
          status={story.status}
          className="absolute top-2 left-2 bg-card"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="line-clamp-2 font-heading text-lg leading-snug group-hover:text-primary">
          {story.title}
        </h2>

        <dl className="flex flex-col gap-1.5 text-sm text-foreground/80">
          <div className="flex items-center gap-2">
            <Crown className="size-4 shrink-0 text-primary" />
            <dt className="sr-only">Dungeon Master</dt>
            <dd className="truncate">
              {story.created_by?.display_name ?? "Unknown DM"}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-primary" />
            <dt className="sr-only">Starts</dt>
            <dd>
              {story.start_at
                ? dayjs(story.start_at).format(BOARD_STORY_START_AT_FORMAT)
                : "Date to be announced"}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between gap-2 border-t pt-3">
          <BoardStoryMemberStatusBadge memberStatus={story.member_status} />
          <span className="flex items-center gap-1.5 text-sm text-foreground/80">
            <Users className="size-4 text-primary" />
            <span className="sr-only">Members</span>
            {formatBoardStoryMembers(story.joined_members, story.max_members)}
          </span>
        </div>
      </div>
    </Link>
  );
}
