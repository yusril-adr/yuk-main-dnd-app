import Image from "next/image";
import { Else, If, Then } from "react-if";

import { cn } from "@/utils/cn";
import dayjs from "@/libs/dayjs";
import { StoryMemberStatusEnum } from "@/api/main/modules/master/stories/enums/story-member-status";

import { PUBLIC_STORY_MEMBER_STATUS_LABEL } from "@/app/(public)/stories/_constants/public-story-member";
import type { TPublicStoryPartyMemberProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryPartyMember({
  member,
}: TPublicStoryPartyMemberProps) {
  const { user } = member;

  return (
    <li className="flex items-center gap-3 rounded-md border bg-background p-3">
      <div className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-primary/40 bg-secondary">
        <If condition={!!user.avatar_url}>
          <Then>
            {/* unoptimized: the browser loads the public storage URL directly */}
            <Image
              src={user.avatar_url as string}
              alt={user.display_name}
              fill
              unoptimized
              loading="lazy"
              sizes="44px"
              className="object-cover"
            />
          </Then>
          <Else>
            <span className="flex size-full items-center justify-center font-heading text-lg text-secondary-foreground">
              {user.display_name.charAt(0).toUpperCase()}
            </span>
          </Else>
        </If>
      </div>

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
