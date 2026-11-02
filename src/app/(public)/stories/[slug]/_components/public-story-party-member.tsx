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
import dayjs from "@/libs/dayjs";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

import { PUBLIC_STORY_MEMBER_STATUS_BADGE_VARIANT } from "@/app/(public)/stories/[slug]/_constants/public-story-member";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import type { TPublicStoryPartyMemberProps } from "@/app/(public)/stories/[slug]/_types/public-story-party-member-props";

const MEMBER_STATUS_KEY = {
  [StoryMemberStatusEnum.REGISTERED]: "enums.memberStatus.registered",
  [StoryMemberStatusEnum.ATTENDED]: "enums.memberStatus.attended",
  [StoryMemberStatusEnum.VIEWER]: "enums.memberStatus.viewer",
} as const;

export default function PublicStoryPartyMember({
  member,
}: TPublicStoryPartyMemberProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const { locale } = useLocale();
  const { user } = member;
  return (
    <Item
      role="listitem"
      variant="outline"
      size="sm"
      className="flex-nowrap bg-background"
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
        <ItemTitle className="block w-full truncate text-base text-foreground">
          <Link
            href={getGuildmateHref(user)}
            className="underline-offset-4 hover:text-primary hover:underline"
          >
            {user.display_name}
          </Link>
        </ItemTitle>
        <ItemDescription className="truncate text-foreground/75">
          {user.username ? `@${user.username} · ` : ""}
          {t("party.joinedOn", {
            date: dayjs(member.created_at).locale(locale).format("D MMM YYYY"),
          })}
        </ItemDescription>
      </ItemContent>

      <ItemActions className="shrink-0">
        <Badge
          variant={PUBLIC_STORY_MEMBER_STATUS_BADGE_VARIANT[member.status]}
          className={cn(
            "rounded-sm shadow-none",
            member.status === StoryMemberStatusEnum.VIEWER &&
              "border-destructive/50 text-destructive",
          )}
        >
          {t(MEMBER_STATUS_KEY[member.status])}
        </Badge>
      </ItemActions>
    </Item>
  );
}
