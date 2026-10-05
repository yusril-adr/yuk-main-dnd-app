import { CalendarPlus, Feather, History } from "lucide-react";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { getInitials } from "@/utils/user-helper";
import dayjs from "@/libs/dayjs";

import StoryDetailSectionCard from "./story-detail-section-card";
import StoryDetailInfoRow from "./story-detail-info-row";
import { STORY_DETAIL_DATE_FORMAT } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-detail-date-format";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailChronicleCard({
  story,
  className,
}: TStoryDetailCardProps) {
  const creatorName = story.created_by?.display_name;

  return (
    <StoryDetailSectionCard
      icon={Feather}
      title="Chronicle"
      className={className}
    >
      <StoryDetailInfoRow
        icon={Feather}
        label="Written By"
        value={
          creatorName && (
            <span className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
                  {getInitials(creatorName)}
                </AvatarFallback>
              </Avatar>
              {creatorName}
            </span>
          )
        }
        emptyText="Unknown"
      />
      <StoryDetailInfoRow
        icon={CalendarPlus}
        label="Recorded"
        value={dayjs(story.created_at).format(STORY_DETAIL_DATE_FORMAT)}
        emptyText="-"
      />
      <StoryDetailInfoRow
        icon={History}
        label="Last Updated"
        value={dayjs(story.updated_at).format(STORY_DETAIL_DATE_FORMAT)}
        emptyText="-"
      />
    </StoryDetailSectionCard>
  );
}
