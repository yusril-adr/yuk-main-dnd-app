"use client";

import Link from "next/link";
import { If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";

import { PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY } from "@/app/(public)/stories/[slug]/_constants/public-story-comment-reaction";
import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import { getPublicStoryCommentReactionOption } from "@/app/(public)/stories/[slug]/_utils/public-story-comment-reaction-option-helper";
import type { TPublicStoryCommentReactorRowProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-reactor-row-props";

export default function PublicStoryCommentReactorRow({
  type,
  user,
  isMine = false,
  isCanRemove = false,
  onRemove,
  isRemoving = false,
}: TPublicStoryCommentReactorRowProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  const username = user.username?.trim();
  const option = getPublicStoryCommentReactionOption(type);

  return (
    <li className="flex min-w-0 items-center gap-2 py-1.5">
      {/* Avatar, name and username are one link to the guildmate page */}
      <Link
        href={getGuildmateHref(user)}
        className="group/user flex min-w-0 flex-1 items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Avatar className="size-9 shrink-0">
          <AvatarImage
            src={user.avatar_url ?? makeDefaultAvatarUrl(user.display_name)}
            alt=""
            loading="lazy"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10 font-heading text-xs text-primary">
            {getInitials(user.display_name)}
          </AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-col">
          <span className="min-w-0 truncate text-sm text-primary underline-offset-4 group-hover/user:underline">
            {user.display_name}
          </span>
          <If condition={!!username}>
            <Then>
              <span className="min-w-0 truncate text-xs text-foreground/70">
                @{username}
              </span>
            </Then>
          </If>
        </span>
      </Link>
      <span className="flex shrink-0 items-center gap-1.5">
        <If condition={user.is_guest}>
          <Then>
            <Badge>{t("comments.reactorGuest")}</Badge>
          </Then>
        </If>
        <If condition={isMine}>
          <Then>
            <Badge variant="outline">{t("comments.reactorYou")}</Badge>
          </Then>
        </If>
        <If condition={isMine && isCanRemove}>
          <Then>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              disabled={isRemoving}
              onClick={onRemove}
              className="text-muted-foreground hover:text-destructive"
            >
              {t("comments.reactorRemove")}
            </Button>
          </Then>
        </If>
        <If condition={!!option}>
          <Then>
            <span
              role="img"
              aria-label={t(PUBLIC_STORY_COMMENT_REACTION_LABEL_KEY[type])}
              className="w-6 text-center text-lg leading-none"
            >
              {option?.emoji}
            </span>
          </Then>
        </If>
      </span>
    </li>
  );
}
