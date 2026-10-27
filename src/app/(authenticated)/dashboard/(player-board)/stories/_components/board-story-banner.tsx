import { Shield } from "lucide-react";
import { Else, If, Then } from "react-if";

import { cn } from "cn";

import type { TBoardStoryBannerProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

// Fills its (relative, sized) parent. Plain <img> so the storage URL loads
// directly without the /_next/image proxy.
export default function BoardStoryBanner({
  bannerUrl,
  title,
  className,
  priority = false,
}: TBoardStoryBannerProps) {
  return (
    <If condition={!!bannerUrl}>
      <Then>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerUrl as string}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("absolute inset-0 size-full object-cover", className)}
        />
      </Then>
      <Else>
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-secondary",
            className,
          )}
        >
          <Shield className="size-10 text-primary/50" />
        </div>
      </Else>
    </If>
  );
}
