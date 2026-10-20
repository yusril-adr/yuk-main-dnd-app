import Link from "next/link";
import { CalendarDays, Crown, Users } from "lucide-react";

import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import dayjs from "@/libs/dayjs";

import BoardStoryBanner from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_components/board-story-banner";
import BoardStoryStatusBadge from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_components/board-story-status-badge";
import BoardStoryMemberStatusBadge from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_components/board-story-member-status-badge";
import { BOARD_STORY_START_AT_FORMAT } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_constants/board-story";
import {
  formatBoardStoryMembers,
  getBoardStoryHref,
} from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_utils/board-story-helper";
import type { TBoardStoryCardProps } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

// The title link is stretched over the whole card (after:inset-0), so the
// card stays one click target without wrapping block content in <a>
export default function BoardStoryCard({ story }: TBoardStoryCardProps) {
  return (
    <Card
      size="sm"
      className="group relative gap-3 pt-0 transition-colors hover:ring-primary/50 has-focus-visible:ring-2 has-focus-visible:ring-ring"
    >
      <AspectRatio ratio={16 / 10} className="overflow-hidden border-b">
        <BoardStoryBanner bannerUrl={story.banner_url} title={story.title} />
        <BoardStoryStatusBadge
          status={story.status}
          className="absolute top-2 left-2 bg-card"
        />
      </AspectRatio>

      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={2}
          className="line-clamp-2 font-heading text-lg leading-snug group-hover:text-primary group-data-[size=sm]/card:text-lg"
        >
          <Link
            href={getBoardStoryHref(story.id)}
            className="outline-none after:absolute after:inset-0"
          >
            {story.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent>
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
      </CardContent>

      <CardFooter className="mt-auto justify-between gap-2 border-t">
        <BoardStoryMemberStatusBadge memberStatus={story.member_status} />
        <span className="flex items-center gap-1.5 text-sm text-foreground/80">
          <Users className="size-4 text-primary" />
          <span className="sr-only">Members</span>
          {formatBoardStoryMembers(story.joined_members, story.max_members)}
        </span>
      </CardFooter>
    </Card>
  );
}
