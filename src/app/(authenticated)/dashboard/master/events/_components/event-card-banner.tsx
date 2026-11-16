import { CalendarDays } from "lucide-react";
import { Else, If, Then } from "react-if";

import { cn } from "cn";

import type { TEventCardBannerProps } from "@/app/(authenticated)/dashboard/master/events/_types/event-card-banner-props";

export default function EventCardBanner({
  bannerUrl,
  title,
  imageClassName,
  placeholderClassName,
}: TEventCardBannerProps) {
  return (
    <If condition={!!bannerUrl}>
      <Then>
        {/* Plain <img> like the user avatars (Base UI AvatarImage): the banner is a
            public storage URL, so no next/image remotePatterns host config is needed.
            Natural aspect ratio (no crop); very tall images are capped and letterboxed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerUrl ?? undefined}
          alt={title}
          className={cn(
            "block h-auto max-h-96 w-full bg-muted/40 object-contain",
            imageClassName,
          )}
        />
      </Then>
      <Else>
        {/* Placeholder for events without a banner: fixed 16:9 by default */}
        <div
          className={cn(
            "flex aspect-video w-full items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20",
            placeholderClassName,
          )}
        >
          <CalendarDays className="size-10 text-primary" />
        </div>
      </Else>
    </If>
  );
}
