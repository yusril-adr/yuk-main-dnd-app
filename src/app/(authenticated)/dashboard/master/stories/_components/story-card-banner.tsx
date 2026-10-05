import { Swords } from "lucide-react";
import { Else, If, Then } from "react-if";

import { cn } from "@/utils/cn";

import type { TStoryCardBannerProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-banner-props";

export default function StoryCardBanner({
  bannerUrl,
  title,
  className,
}: TStoryCardBannerProps) {
  return (
    <If condition={!!bannerUrl}>
      <Then>
        {/* Plain <img> like the user avatars (Base UI AvatarImage): the banner is a
            public storage URL, so no next/image remotePatterns host config is needed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerUrl ?? undefined}
          alt={title}
          className={cn("aspect-video w-full object-cover", className)}
        />
      </Then>
      <Else>
        {/* Placeholder for stories without a banner */}
        <div
          className={cn(
            "flex aspect-video w-full items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20",
            className,
          )}
        >
          <Swords className="size-10 text-primary/40" />
        </div>
      </Else>
    </If>
  );
}
