"use client";

import { useEffect, useState } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/app/_components/ui/carousel";

import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import HomeGuildSlide from "@/app/(public)/_components/home-guild-slide";
import { HOME_GUILD_PHOTOS } from "@/app/(public)/_constants/home-guild-photos";

export default function HomeGuildCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    <section aria-labelledby="our-guild" className="flex flex-col gap-4">
      <HomeSectionHeader
        id="our-guild"
        title="Our guild"
        description="A circle of friends who roll dice, share tales and get gloriously lost in dungeons together. New faces are always welcome by the hearth."
      />
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        aria-label="Guild photos"
        className="w-full"
      >
        <CarouselContent>
          {HOME_GUILD_PHOTOS.map((photo, index) => (
            <CarouselItem
              key={photo.alt}
              aria-label={`${index + 1} of ${HOME_GUILD_PHOTOS.length}`}
            >
              <HomeGuildSlide photo={photo} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Arrows sit inside the slide so they never overflow on mobile */}
        <CarouselPrevious className="left-2 bg-card/90" />
        <CarouselNext className="right-2 bg-card/90" />
      </Carousel>
      <div className="flex justify-center gap-1">
        {HOME_GUILD_PHOTOS.map((photo, index) => (
          <Button
            key={photo.alt}
            variant="ghost"
            size="icon-sm"
            aria-label={`Show photo ${index + 1}`}
            aria-current={current === index}
            onClick={() => api?.scrollTo(index)}
            className="group/dot hover:bg-transparent aria-expanded:bg-transparent"
          >
            <span
              className={`h-2 rounded-full transition-all ${current === index ? "w-5 bg-primary" : "w-2 bg-muted-foreground/40 group-hover/dot:bg-muted-foreground"}`}
            />
          </Button>
        ))}
      </div>
    </section>
  );
}
