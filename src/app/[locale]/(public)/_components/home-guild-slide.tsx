import Image from "next/image";
import { Camera } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/app/_components/ui/button";
import { AspectRatio } from "@/app/_components/ui/aspect-ratio";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";

import type { THomeGuildSlideProps } from "@/app/[locale]/(public)/_types/home-components-props";

export default function HomeGuildSlide({
  photo,
  onOpen,
}: THomeGuildSlideProps) {
  const t = useTranslations("home.guild");

  return (
    <Card className="gap-0 border border-primary/40 bg-card p-1 ring-0 sm:p-1.5">
      <CardContent className="overflow-hidden rounded-[calc(var(--radius-xl)-5px)] border border-primary/20 p-0 sm:rounded-[calc(var(--radius-xl)-7px)]">
        <AspectRatio ratio={16 / 9}>
          {photo.src ? (
            <Button
              variant="ghost"
              onClick={onOpen}
              aria-label={t("enlarge", { caption: photo.caption ?? photo.alt })}
              className="absolute inset-0 size-full cursor-zoom-in rounded-none border-0 p-0 hover:bg-transparent focus-visible:ring-inset"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                style={{ objectPosition: photo.objectPosition ?? "center" }}
              />
            </Button>
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
                  {t("comingSoon")}
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
