import Image from "next/image";
import { Shield } from "lucide-react";
import { Else, If, Then } from "react-if";

import { cn } from "@/utils/cn";

import type { TPublicGuildmateStoryBannerProps } from "@/app/[locale]/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

// Fills its (relative, sized) parent. `unoptimized`: the browser loads the
// public storage URL directly (like the dashboard's <img>), skipping the
// /_next/image proxy. That proxy fails when the storage host resolves to a
// private/fake IP (Next 16 blocks those) and adds server load on small hosts.
// next/image still gives lazy loading and async decoding.
export default function PublicGuildmateStoryBanner({
  bannerUrl,
  title,
  className,
  iconClassName,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: TPublicGuildmateStoryBannerProps) {
  return (
    <If condition={!!bannerUrl}>
      <Then>
        <Image
          src={bannerUrl as string}
          alt={title}
          fill
          unoptimized
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn("object-cover", className)}
        />
      </Then>
      <Else>
        <div
          aria-hidden
          className={cn(
            "flex size-full items-center justify-center bg-secondary",
            className,
          )}
        >
          <Shield
            className={cn("size-10 text-primary/60 sm:size-12", iconClassName)}
          />
        </div>
      </Else>
    </If>
  );
}
