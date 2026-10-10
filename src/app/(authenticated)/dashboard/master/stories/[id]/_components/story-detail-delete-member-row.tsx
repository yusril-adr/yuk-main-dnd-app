"use client";

import { useCallback } from "react";
import { If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { STORY_MEMBER_STATUS_LABEL } from "@/api/main/modules/master/stories/enums/story-member-status-label";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

import type { TStoryDetailDeleteMemberRowProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-delete-member-row-props";

export default function StoryDetailDeleteMemberRow({
  member,
  checked,
  disabled,
  onCheckedChange,
}: TStoryDetailDeleteMemberRowProps) {
  const onCheckboxCheckedChange = useCallback(
    (nextChecked: boolean) => {
      onCheckedChange(member.user.id, nextChecked);
    },
    [onCheckedChange, member.user.id],
  );
  const statusLabel = STORY_MEMBER_STATUS_LABEL[member.status];

  return (
    <label className="flex min-w-0 items-center gap-2">
      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckboxCheckedChange}
      />
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
      <span className="min-w-0 truncate">{member.user.display_name}</span>
      <If condition={!!statusLabel}>
        <Then>
          <Badge variant="outline">{statusLabel}</Badge>
        </Then>
      </If>
    </label>
  );
}
