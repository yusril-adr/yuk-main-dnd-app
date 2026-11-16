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
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import { cn } from "cn";
import { If, Then } from "react-if";
import dayjs from "@/libs/dayjs";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import { EventMemberStatusEnum } from "@/api/main/modules/master/events/enums/event-member-status";

import { PUBLIC_EVENT_MEMBER_STATUS_BADGE_VARIANT } from "@/app/(public)/events/[slug]/_constants/public-event-member";
import { EVENT_DETAIL_MESSAGES } from "@/app/(public)/events/[slug]/_messages";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import type { TPublicEventPartyMemberProps } from "@/app/(public)/events/[slug]/_types/public-event-party-member-props";

const MEMBER_STATUS_KEY = {
  [EventMemberStatusEnum.REGISTERED]: "enums.memberStatus.registered",
  [EventMemberStatusEnum.ATTENDED]: "enums.memberStatus.attended",
  [EventMemberStatusEnum.ABSENT]: "enums.memberStatus.absent",
} as const;

export default function PublicEventPartyMember({
  member,
}: TPublicEventPartyMemberProps) {
  const { t } = useT(EVENT_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const { user } = member;
  const username = user.username?.trim();

  return (
    <Item
      role="listitem"
      variant="outline"
      size="sm"
      className="flex-nowrap bg-background"
    >
      <Link
        href={getGuildmateHref(user)}
        className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <ItemMedia>
          <Avatar className="size-11 shrink-0 border-2 border-primary/40">
            <AvatarImage
              src={user.avatar_url ?? makeDefaultAvatarUrl(user.display_name)}
              alt={user.display_name}
              loading="lazy"
              className="object-cover"
            />
            <AvatarFallback className="font-heading text-lg">
              {getInitials(user.display_name)}
            </AvatarFallback>
          </Avatar>
        </ItemMedia>

        <ItemContent className="min-w-0 gap-0">
          <ItemTitle className="block w-full truncate text-base text-foreground underline-offset-4 group-hover:text-primary group-hover:underline">
            {user.display_name}
          </ItemTitle>
          <ItemDescription className="truncate text-foreground/75">
            <If condition={!!username}>
              <Then>
                <span>@{username} · </span>
              </Then>
            </If>
            {t("party.joinedOn", {
              date: dayjs(member.created_at).locale(locale).format("D MMM YYYY"),
            })}
          </ItemDescription>
        </ItemContent>
      </Link>

      <ItemActions className="shrink-0">
        <Badge
          variant={PUBLIC_EVENT_MEMBER_STATUS_BADGE_VARIANT[member.status]}
          className={cn(
            "rounded-sm shadow-none",
            member.status === EventMemberStatusEnum.ABSENT &&
              "border-destructive/50 text-destructive",
          )}
        >
          {t(MEMBER_STATUS_KEY[member.status])}
        </Badge>
      </ItemActions>
    </Item>
  );
}
