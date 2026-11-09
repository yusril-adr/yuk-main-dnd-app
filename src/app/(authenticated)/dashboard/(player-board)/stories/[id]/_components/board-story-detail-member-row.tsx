"use client";

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
import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import { useT } from "@/app/_hooks/use-t";

import { BOARD_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_messages";
import type { TBoardStoryDetailMemberRowProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/[id]/_types/board-story-detail-components-props";

const MEMBER_STATUS_KEY = {
  [StoryMemberStatusEnum.REGISTERED]: "enums.memberStatus.registered",
  [StoryMemberStatusEnum.VIEWER]: "enums.memberStatus.viewer",
  [StoryMemberStatusEnum.ATTENDED]: "enums.memberStatus.attended",
} as const;

export default function BoardStoryDetailMemberRow({
  member,
  variant,
}: TBoardStoryDetailMemberRowProps) {
  const { t } = useT(BOARD_STORY_DETAIL_MESSAGES);

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

  const statusLabel = t(MEMBER_STATUS_KEY[member.status]);

  return (
    <Item role="listitem" size="xs" className="flex-nowrap gap-2 p-0">
      {/* Avatar and name are one link to the guildmate page */}
      <Link
        href={getGuildmateHref(member.user)}
        className="group/user flex min-w-0 flex-1 items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ItemMedia>{avatar}</ItemMedia>
        <ItemContent className="min-w-0">
          <ItemTitle className="w-full font-normal">
            <span className="min-w-0 truncate text-primary underline-offset-4 group-hover/user:underline">
              {member.user.display_name}
            </span>
          </ItemTitle>
        </ItemContent>
      </Link>
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
