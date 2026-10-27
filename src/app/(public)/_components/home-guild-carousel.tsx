"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "cn";
import { Button } from "@/app/_components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/app/_components/ui/carousel";

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import HomeGuildSlide from "@/app/(public)/_components/home-guild-slide";
import HomeGuildPhotoDialog from "@/app/(public)/_components/home-guild-photo-dialog";
import { HOME_GUILD_PHOTOS } from "@/app/(public)/_constants/home-guild-photos";

export default function HomeGuildCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Pauses while hovered or after the user navigates
  const [plugins] = useState(() => [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  // Hold autoplay while the enlarged photo is open, resume when it closes
  const handleOpenIndexChange = (index: number | null) => {
    setOpenIndex(index);
    const autoplay = plugins[0];
    if (index === null) {
      autoplay.play();
    } else {
      autoplay.stop();
    }
  };

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <HomeBand labelledBy="life-in-the-guild" muted>
      <HomeSectionHeader
        id="life-in-the-guild"
        title="Life in the guild"
        description="A circle of friends who roll dice, share tales and get gloriously lost in dungeons together. New faces are always welcome by the hearth."
      />
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={plugins}
        aria-label="Guild photos"
        className="w-full px-12 sm:px-16"
      >
        <CarouselContent>
          {HOME_GUILD_PHOTOS.map((photo, index) => (
            <CarouselItem
              key={photo.alt}
              aria-label={`${index + 1} of ${HOME_GUILD_PHOTOS.length}`}
            >
              <HomeGuildSlide
                photo={photo}
                onOpen={() => handleOpenIndexChange(index)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Arrows sit in the side padding, beside the photo */}
        <CarouselPrevious className="left-0 sm:left-2 sm:size-10" />
        <CarouselNext className="right-0 sm:right-2 sm:size-10" />
      </Carousel>
      <div className="-mt-2 flex justify-center gap-3">
        {HOME_GUILD_PHOTOS.map((photo, index) => (
          <Button
            key={photo.alt}
            variant="ghost"
            aria-label={`Show photo ${index + 1}`}
            aria-current={current === index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "relative h-2 min-w-0 rounded-full p-0 transition-all after:absolute after:-inset-3",
              current === index
                ? "w-5 bg-primary hover:bg-primary"
                : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
      <HomeGuildPhotoDialog
        photos={HOME_GUILD_PHOTOS}
        openIndex={openIndex}
        onOpenIndexChange={handleOpenIndexChange}
      />
    </HomeBand>
  );
}
