import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

import { cn } from "@/utils/cn";
import dayjs from "@/libs/dayjs";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";
import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

import { PUBLIC_STORY_MEMBER_STATUS_LABEL } from "@/app/(public)/stories/_constants/public-story-member";
import type { TPublicStoryPartyMemberProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryPartyMember({
  member,
}: TPublicStoryPartyMemberProps) {
  const { user } = member;

  return (
    <li className="flex items-center gap-3 rounded-md border bg-background p-3">
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

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium text-foreground">
          {user.display_name}
        </span>
        <span className="truncate text-sm text-foreground/75">
          {user.username ? `@${user.username} · ` : ""}
          Joined {dayjs(member.created_at).format("D MMM YYYY")}
        </span>
      </div>

      <span
        className={cn(
          "shrink-0 rounded-sm border px-2 py-0.5 text-xs font-medium",
          member.status === StoryMemberStatusEnum.ATTENDED &&
            "border-primary bg-primary text-primary-foreground",
          member.status === StoryMemberStatusEnum.ABSENT &&
            "border-destructive/50 text-destructive",
          member.status === StoryMemberStatusEnum.REGISTERED &&
            "bg-secondary text-secondary-foreground",
        )}
      >
        {PUBLIC_STORY_MEMBER_STATUS_LABEL[member.status]}
      </span>
    </li>
  );
}
