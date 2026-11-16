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
import { useT } from "@/app/_hooks/use-t";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";
import type { TEventDetailAddMemberRowProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-add-member-row-props";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

export default function EventDetailAddMemberRow({
  user,
  checked,
  disabled,
  onCheckedChange,
}: TEventDetailAddMemberRowProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);
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
      <If condition={user.is_guest}>
        <Then>
          <Badge className="shrink-0">{t("guest.badge")}</Badge>
        </Then>
      </If>
    </label>
  );
}
