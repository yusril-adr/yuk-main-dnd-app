import Image from "next/image";
import { Camera } from "lucide-react";

import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";

import type { THomeGuildSlideProps } from "@/app/(public)/_types/home-components-props";

export default function HomeGuildSlide({ photo }: THomeGuildSlideProps) {
  return (
    <Card className="gap-0 border border-primary/40 bg-card p-1 ring-0 sm:p-1.5">
      <CardContent className="overflow-hidden rounded-md border border-primary/20 p-0">
        <AspectRatio ratio={16 / 9}>
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition ?? "center" }}
            />
          ) : (
            <Empty
              role="img"
              aria-label={photo.alt}
              className="absolute inset-0 rounded-none bg-muted px-12"
            >
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Camera />
                </EmptyMedia>
                <EmptyTitle className="text-sm sm:text-base">
                  Guild photo coming soon
                </EmptyTitle>
                {photo.caption && (
                  <EmptyDescription className="italic">
                    {photo.caption}
                  </EmptyDescription>
                )}
              </EmptyHeader>
            </Empty>
          )}
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
