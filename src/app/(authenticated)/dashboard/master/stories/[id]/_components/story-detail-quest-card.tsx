import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import StoryDetailSectionCard from "./story-detail-section-card";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailQuestCard({
  story,
  className,
}: TStoryDetailCardProps) {
  return (
    <StoryDetailSectionCard
      icon={Scroll}
      title="Quest Details"
      className={className}
    >
      <If condition={!!story.description}>
        <Then>
          <p className="whitespace-pre-line break-words text-base leading-relaxed">
            {story.description}
          </p>
        </Then>
        <Else>
          <p className="italic text-muted-foreground">
            No description has been written for this quest yet.
          </p>
        </Else>
      </If>
    </StoryDetailSectionCard>
  );
}
