import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
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
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <StoryDetailOrnament />
        {children}
      </CardContent>
    </Card>
  );
}
