import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { cn } from "@/utils/cn";

import StoryDetailOrnament from "./story-detail-ornament";
import type { TStoryDetailSectionCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-section-card-props";

export default function StoryDetailSectionCard({
  icon: Icon,
  title,
  className,
  children,
}: TStoryDetailSectionCardProps) {
  return (
    <Card className={cn("border-2 border-primary/15", className)}>
      <CardHeader>
        <h3
          data-slot="card-title"
          className="flex items-center gap-2 font-heading text-lg leading-normal font-medium"
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <Icon className="size-4" />
          </span>
          {title}
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <StoryDetailOrnament />
        {children}
      </CardContent>
    </Card>
  );
}
