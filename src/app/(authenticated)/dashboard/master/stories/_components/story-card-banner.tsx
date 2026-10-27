import Image from "next/image";
import { Swords } from "lucide-react";
import { Else, If, Then } from "react-if";

import { cn } from "cn";

import type { TStoryCardBannerProps } from "@/app/(authenticated)/dashboard/master/stories/_types/story-card-banner-props";

export default function StoryCardBanner({
  bannerUrl,
  title,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  preload = false,
  loading,
  imageClassName,
  placeholderClassName,
}: TStoryCardBannerProps) {
  return (
    <If condition={!!bannerUrl}>
      <Then>
        {/* Sized by its classes; width/height 0 because the intrinsic size is unknown.
            Natural aspect ratio (no crop); very tall images are capped and letterboxed. */}
        <Image
          src={bannerUrl as string}
          alt={title}
          width={0}
          height={0}
          sizes={sizes}
          preload={preload}
          loading={preload ? undefined : loading}
          className={cn(
            "block h-auto max-h-96 w-full bg-muted/40 object-contain",
            imageClassName,
          )}
        />
      </Then>
      <Else>
        {/* Placeholder for stories without a banner: fixed 16:9 by default */}
        <div
          className={cn(
            "flex aspect-video w-full items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20",
            placeholderClassName,
          )}
        >
          <Swords className="size-10 text-primary" />
        </div>
      </Else>
    </If>
  );
}
