import { Swords } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";

import BoardStoryStatusBadge from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-status-badge";
import { BOARD_STORY_TYPE_ICON } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// Banner strip at a capped responsive height with a centre crop, so any
// image ratio fills it. Solid placeholder (no gradient) without a banner.
const BANNER_HEIGHT = "h-48 sm:h-56 lg:h-64";

export default function BoardStoryDetailHero({
  story,
}: TBoardStoryDetailCardProps) {
  const TypeIcon = BOARD_STORY_TYPE_ICON[story.type];

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <If condition={!!story.banner_url}>
        <Then>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.banner_url ?? undefined}
            alt={story.title}
            className={`block w-full object-cover ${BANNER_HEIGHT}`}
          />
        </Then>
        <Else>
          <div
            aria-hidden
            className={`flex w-full items-center justify-center bg-secondary ${BANNER_HEIGHT}`}
          >
            <Swords className="size-10 text-primary" />
          </div>
        </Else>
      </If>

      <div className="flex flex-col gap-2 border-t p-6">
        <h2 className="font-heading text-2xl font-medium leading-tight break-words sm:text-3xl">
          {story.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <BoardStoryStatusBadge status={story.status} />
          <Badge variant="outline" className="gap-1 [&>svg]:size-3">
            <TypeIcon />
            {STORY_TYPE_LABEL[story.type]}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            /{story.slug}
          </span>
        </div>
      </div>
    </Card>
  );
}
