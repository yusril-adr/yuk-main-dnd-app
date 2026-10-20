import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import { STORY_MEMBER_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-member-status-label";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";

import type { TBoardStoryDetailMemberRowProps } from "@/app/[locale]/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

export default function BoardStoryDetailMemberRow({
  member,
  variant,
}: TBoardStoryDetailMemberRowProps) {
  const avatar = (
    <Avatar className="size-7" title={member.user.display_name}>
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

  if (variant === "avatar") return avatar;

  const statusLabel = STORY_MEMBER_STATUS_LABEL[member.status];

  return (
    <Item role="listitem" size="xs" className="flex-nowrap gap-2 p-0">
      <ItemMedia>{avatar}</ItemMedia>
      <ItemContent className="min-w-0">
        <ItemTitle className="w-full font-normal">
          <Link
            href={getGuildmateHref(member.user)}
            className="min-w-0 truncate text-primary underline-offset-4 hover:underline"
          >
            {member.user.display_name}
          </Link>
        </ItemTitle>
      </ItemContent>
      {statusLabel && (
        <ItemActions>
          <Badge variant="outline" className="shrink-0">
            {statusLabel}
          </Badge>
        </ItemActions>
      )}
    </Item>
  );
}
