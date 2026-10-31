"use client";

import HomeHero from "@/app/(public)/_components/home-hero";
import HomePitch from "@/app/(public)/_components/home-pitch";
import HomeStoriesSection from "@/app/(public)/_components/home-stories-section";
import HomeLegendsSection from "@/app/(public)/_components/home-legends-section";
import HomeGuildCarousel from "@/app/(public)/_components/home-guild-carousel";
import HomeFinalCta from "@/app/(public)/_components/home-final-cta";
import { useRegisterMessages } from "@/app/_hooks/use-register-messages";
import { HOME_MESSAGES, HOME_NS } from "@/app/(public)/_messages";

export default function HomePageClient() {
  // Sync register before children call useT("home") — SSR + locale switch safe
  useRegisterMessages(HOME_NS, HOME_MESSAGES);

  return (
    <main className="flex w-full min-w-0 flex-col">
      <HomeHero />
      <HomePitch />
      <HomeStoriesSection />
      <HomeLegendsSection />
      <HomeGuildCarousel />
      <HomeFinalCta />
    </main>
  );
}
