"use client";

import Link from "next/link";
import { If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import { useT } from "@/app/_hooks/use-t";

import type { TStoryDetailMemberRowProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-member-row-props";
import { MASTER_STORY_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/stories/[id]/_messages";

const MEMBER_STATUS_KEY = {
  [StoryMemberStatusEnum.REGISTERED]: "enums.memberStatus.registered",
  [StoryMemberStatusEnum.VIEWER]: "enums.memberStatus.viewer",
  [StoryMemberStatusEnum.ATTENDED]: "enums.memberStatus.attended",
} as const;

export default function StoryDetailMemberRow({
  member,
  variant,
}: TStoryDetailMemberRowProps) {
  const { t } = useT(MASTER_STORY_DETAIL_MESSAGES);

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

  const statusLabel = t(MEMBER_STATUS_KEY[member.status]);

  return (
    <span className="flex min-w-0 items-center gap-2">
      {/* Avatar and name are one link to the guildmate page */}
      <Link
        href={getGuildmateHref(member.user)}
        className="group/user flex min-w-0 items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {avatar}
        <span className="min-w-0 truncate text-primary underline-offset-4 group-hover/user:underline">
          {member.user.display_name}
        </span>
      </Link>
      <If condition={member.user.is_guest}>
        <Then>
          <Badge className="shrink-0">{t("guest.badge")}</Badge>
        </Then>
      </If>
      {/* Per-member actions (attended, viewer) mount here, beside the status badge. */}
      <span className="ms-auto flex shrink-0 items-center gap-2">
        <If condition={!!statusLabel}>
          <Then>
            <Badge variant="outline">{statusLabel}</Badge>
          </Then>
        </If>
      </span>
    </span>
  );
}
