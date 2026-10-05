import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { toTitleCase } from "@/utils/format-text";

import StoryCardBanner from "@/app/(authenticated)/dashboard/master/stories/_components/story-card-banner";
import StoryStatusBadge from "@/app/(authenticated)/dashboard/master/stories/_components/story-status-badge";
import { STORY_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-type-icon";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailHero({ story }: TStoryDetailCardProps) {
  const TypeIcon = STORY_TYPE_ICON[story.type];

  return (
    <Card className="relative gap-0 overflow-hidden py-0">
      {/* Height capped so wide screens don't get a ~680px 16:9 banner */}
      <StoryCardBanner
        bannerUrl={story.banner_url}
        title={story.title}
        className="aspect-auto h-60 sm:h-72 lg:h-80"
      />

      {/* Fade the banner into the card so the text stays readable on any image */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <h2 className="font-heading text-2xl font-medium leading-tight break-words line-clamp-2 sm:text-3xl">
          {story.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <StoryStatusBadge status={story.status} />
          <Badge
            variant="outline"
            className="gap-1 bg-background/60 backdrop-blur [&>svg]:size-3"
          >
            <TypeIcon />
            {toTitleCase(story.type)}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            /{story.slug}
          </span>
        </div>
      </div>
    </Card>
  );
}
