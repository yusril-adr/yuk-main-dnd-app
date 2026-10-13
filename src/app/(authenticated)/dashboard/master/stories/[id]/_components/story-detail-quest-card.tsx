import { Scroll } from "lucide-react";
import { Else, If, Then } from "react-if";

import RichTextContent from "@/app/_components/rich-text-content";

import StoryDetailCopyDescriptionButton from "./story-detail-copy-description-button";
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
          <div className="flex justify-end">
            <StoryDetailCopyDescriptionButton
              description={story.description as string}
            />
          </div>
          <RichTextContent
            value={story.description as string}
            className="text-base"
          />
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
