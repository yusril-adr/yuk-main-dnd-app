import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { STORY_TYPE_LABEL } from "@/api/main/modules/master/stories/enums/story-type-label";

import StoryCardBanner from "@/app/(authenticated)/dashboard/master/stories/_components/story-card-banner";
import StoryStatusBadge from "@/app/(authenticated)/dashboard/master/stories/_components/story-status-badge";
import { STORY_TYPE_ICON } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-type-icon";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailHero({ story }: TStoryDetailCardProps) {
  const TypeIcon = STORY_TYPE_ICON[story.type];

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* Natural aspect ratio; very tall images capped at 28rem and letterboxed.
          No banner: a short gradient strip instead of 16:9. */}
      <StoryCardBanner
        bannerUrl={story.banner_url}
        title={story.title}
        imageClassName="max-h-[28rem]"
        placeholderClassName="aspect-auto h-40 sm:h-48"
      />

      <div className="flex flex-col gap-2 border-t p-6">
        <h2 className="font-heading text-2xl font-medium leading-tight break-words sm:text-3xl">
          {story.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <StoryStatusBadge status={story.status} />
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
