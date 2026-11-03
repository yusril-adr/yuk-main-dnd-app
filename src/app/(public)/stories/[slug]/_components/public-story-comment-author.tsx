"use client";

import Link from "next/link";
import { MessageSquareOff } from "lucide-react";
import { If, Then } from "react-if";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { ItemTitle } from "@/app/_components/ui/item";
import { cn } from "cn";
import {
  getGuildmateHref,
  getInitials,
  makeDefaultAvatarUrl,
} from "@/utils/user-helper";
import type { TPublicStoryCommentAuthorProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-author-props";

export default function PublicStoryCommentAuthor({
  author,
  avatarSize,
  isReply,
  deletedLabel,
}: TPublicStoryCommentAuthorProps) {
  if (!author) {
    return (
      <div className="flex min-w-0 items-start gap-2 sm:gap-2.5">
        <Avatar className={cn(avatarSize, "shrink-0")}>
          <AvatarFallback aria-hidden>
            <MessageSquareOff className="size-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <ItemTitle className="min-w-0 truncate text-sm text-muted-foreground">
          {deletedLabel}
        </ItemTitle>
      </div>
    );
  }

  const username = author.username?.trim();

  return (
    <Link
      href={getGuildmateHref(author)}
      className="group flex min-w-0 items-start gap-2 rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:gap-2.5"
    >
      <Avatar
        className={cn(avatarSize, "shrink-0 border-2 border-primary/40")}
      >
        <AvatarImage
          src={
            author.avatar_url ?? makeDefaultAvatarUrl(author.display_name)
          }
          alt=""
          loading="lazy"
          className="object-cover"
        />
        <AvatarFallback
          className={cn("font-heading", isReply && "max-sm:text-xs")}
        >
          {getInitials(author.display_name)}
        </AvatarFallback>
      </Avatar>
      <span className="flex min-w-0 flex-col gap-0.5">
        <ItemTitle className="min-w-0 truncate text-sm text-foreground underline-offset-4 group-hover:text-primary group-hover:underline">
          {author.display_name}
        </ItemTitle>
        <If condition={!!username}>
          <Then>
            <span className="min-w-0 break-all text-xs text-foreground/70">
              @{username}
            </span>
          </Then>
        </If>
      </span>
    </Link>
  );
}
