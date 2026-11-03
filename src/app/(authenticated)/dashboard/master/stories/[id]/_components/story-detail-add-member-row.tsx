"use client";

import { useCallback } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

import type { TStoryDetailAddMemberRowProps } from "@/app/(authenticated)/dashboard/master/stories/[id]/_types/story-detail-add-member-row-props";

export default function StoryDetailAddMemberRow({
  user,
  checked,
  disabled,
  onCheckedChange,
}: TStoryDetailAddMemberRowProps) {
  const onCheckboxCheckedChange = useCallback(
    (nextChecked: boolean) => {
      onCheckedChange(user.id, nextChecked);
    },
    [onCheckedChange, user.id],
  );

  return (
    <label className="flex min-w-0 items-center gap-2">
      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckboxCheckedChange}
      />
      <Avatar className="size-7">
        <AvatarImage
          src={user.avatar_url ?? makeDefaultAvatarUrl(user.display_name)}
          alt={user.display_name}
        />
        <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
          {getInitials(user.display_name)}
        </AvatarFallback>
      </Avatar>
      <span className="min-w-0 truncate">{user.display_name}</span>
    </label>
  );
}
