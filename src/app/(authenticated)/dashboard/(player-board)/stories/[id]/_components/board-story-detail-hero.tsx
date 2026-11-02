"use client";

import { Swords } from "lucide-react";
import { Else, If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { useT } from "@/app/_hooks/use-t";

import BoardStoryStatusBadge from "@/app/(authenticated)/dashboard/(player-board)/stories/_components/board-story-status-badge";
import BoardStoryDetailSlug from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_components/board-story-detail-slug";
import { BOARD_STORY_TYPE_ICON } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_constants/board-story-detail";
import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailCardProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

// Banner strip at a capped responsive height with a centre crop, so any
// image ratio fills it. Solid placeholder (no gradient) without a banner.
const BANNER_HEIGHT = "h-48 sm:h-56 lg:h-64";

const STATUS_KEY = {
  [StoryStatusEnum.DRAFT]: "enums.status.draft",
  [StoryStatusEnum.PUBLISHED]: "enums.status.published",
  [StoryStatusEnum.ARCHIVED]: "enums.status.archived",
  [StoryStatusEnum.CANCELLED]: "enums.status.cancelled",
  [StoryStatusEnum.COMPLETED]: "enums.status.completed",
} as const;

const TYPE_KEY = {
  [StoryTypeEnum.ONESHOT]: "enums.type.oneshot",
  [StoryTypeEnum.CAMPAIGN]: "enums.type.campaign",
} as const;

export default function BoardStoryDetailHero({
  story,
}: TBoardStoryDetailCardProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);
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

      <CardHeader className="gap-2 border-t py-6">
        <CardTitle
          role="heading"
          aria-level={2}
          className="font-heading text-2xl font-medium leading-tight break-words sm:text-3xl"
        >
          {story.title}
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <BoardStoryStatusBadge
            status={story.status}
            label={t(STATUS_KEY[story.status])}
          />
          <Badge variant="outline" className="gap-1 [&>svg]:size-3">
            <TypeIcon />
            {t(TYPE_KEY[story.type])}
          </Badge>
          <BoardStoryDetailSlug
            slug={story.slug}
            isCanViewPublic={story.action_list.is_can_view_public}
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
