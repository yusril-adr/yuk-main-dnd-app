"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { useT } from "@/app/_hooks/use-t";

import StoryCardBanner from "@/app/(authenticated)/dashboard/master/stories/_components/story-card-banner";
import StoryStatusBadge from "@/app/(authenticated)/dashboard/master/stories/_components/story-status-badge";
import StoryDetailSlug from "@/app/(authenticated)/dashboard/master/stories/[id]/_components/story-detail-slug";
import { STORY_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-type-icon";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

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

export default function StoryDetailHero({ story }: TStoryDetailCardProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);
  const TypeIcon = STORY_TYPE_ICON[story.type];

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* Fixed responsive height with a center crop, like the public story
          detail banner, so any image ratio fills the strip */}
      <StoryCardBanner
        bannerUrl={story.banner_url}
        title={story.title}
        imageClassName="h-56 max-h-none object-cover sm:h-72 lg:h-80"
        placeholderClassName="aspect-auto h-56 sm:h-72 lg:h-80"
      />

      <div className="flex flex-col gap-2 border-t p-6">
        <h2 className="font-heading text-2xl font-medium leading-tight break-words sm:text-3xl">
          {story.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <StoryStatusBadge
            status={story.status}
            label={t(STATUS_KEY[story.status])}
          />
          <Badge variant="outline" className="gap-1 [&>svg]:size-3">
            <TypeIcon />
            {t(TYPE_KEY[story.type])}
          </Badge>
          <StoryDetailSlug
            slug={story.slug}
            isCanViewPublic={story.action_list.is_can_view_public}
          />
        </div>
      </div>
    </Card>
  );
}
