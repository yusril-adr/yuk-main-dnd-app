import { CalendarPlus, Feather, History } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";
import dayjs from "@/libs/dayjs";

import StoryDetailSectionCard from "./story-detail-section-card";
import StoryDetailInfoRow from "./story-detail-info-row";
import { STORY_DETAIL_DATE_FORMAT } from "@/app/(authenticated)/dashboard/master/stories/[id]/_constants/story-detail-date-format";
import type { TStoryDetailCardProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-card-props";

export default function StoryDetailChronicleCard({
  story,
  className,
}: TStoryDetailCardProps) {
  const creator = story.created_by;

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
          creator?.display_name && (
            <span className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarImage
                  src={
                    creator?.avatar_url ??
                    makeDefaultAvatarUrl(creator?.display_name)
                  }
                  alt={creator?.display_name || "-"}
                />
                <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
                  {getInitials(creator?.display_name)}
                </AvatarFallback>
              </Avatar>
              {creator?.display_name}
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
