import Image from "next/image";
import { Shield } from "lucide-react";
import { Else, If, Then } from "react-if";

import { cn } from "cn";

import type { TBoardStoryBannerProps } from "@/app/(authenticated)/dashboard/(player-board)/stories/_types/board-story-components-props";

// Fills its (relative, sized) parent. Served through /_next/image; the
// storage host is allowed in next.config.ts images.remotePatterns.
export default function BoardStoryBanner({
  bannerUrl,
  title,
  className,
  preload = false,
  loading,
}: TBoardStoryBannerProps) {
  return (
    <If condition={!!bannerUrl}>
      <Then>
        <Image
          src={bannerUrl as string}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          preload={preload}
          loading={preload ? undefined : loading}
          className={cn("object-cover", className)}
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
