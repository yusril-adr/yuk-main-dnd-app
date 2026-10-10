import { If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { STORY_MEMBER_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-member-status-label";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

import type { TStoryDetailMemberRowProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-member-row-props";

export default function StoryDetailMemberRow({
  member,
  variant,
}: TStoryDetailMemberRowProps) {
  const avatar = (
    <Avatar className="size-7">
      <AvatarImage
        src={
          member.user.avatar_url ??
          makeDefaultAvatarUrl(member.user.display_name)
        }
        alt={member.user.display_name}
      />
      <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
        {getInitials(member.user.display_name)}
      </AvatarFallback>
    </Avatar>
  );

  if (variant === "avatar") {
    return <span className="flex items-center">{avatar}</span>;
  }

  const statusLabel = STORY_MEMBER_STATUS_LABEL[member.status];

  return (
    <span className="flex min-w-0 items-center gap-2">
      {avatar}
      <span className="min-w-0 truncate">{member.user.display_name}</span>
      <If condition={!!statusLabel}>
        <Then>
          <Badge variant="outline" className="ms-auto shrink-0">
            {statusLabel}
          </Badge>
        </Then>
      </If>
    </span>
  );
}
