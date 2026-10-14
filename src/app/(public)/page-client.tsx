"use client";

import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";

import HomeHero from "@/app/(public)/_components/home-hero";
import HomeGuildCarousel from "@/app/(public)/_components/home-guild-carousel";
import HomeStoriesSection from "@/app/(public)/_components/home-stories-section";
import HomeLegendsSection from "@/app/(public)/_components/home-legends-section";
import HomeHowItWorks from "@/app/(public)/_components/home-how-it-works";

export default function HomePageClient() {
  return (
    <div className="flex w-full min-w-0 justify-center">
      <main className="flex w-full max-w-7xl flex-col gap-12 px-4 pt-2 pb-10 sm:gap-16 sm:px-6 sm:pb-16 lg:px-10">
        <HomeHero />
        <HomeGuildCarousel />
        <HomeStoriesSection
          id="open-quests"
          status={StoryStatusEnum.PUBLISHED}
          title="Open quests"
          description="Tables still seeking brave adventurers."
          emptyText="No quests are posted on the board right now. Check back soon."
        />
        <HomeLegendsSection />
        <HomeStoriesSection
          id="completed-quests"
          status={StoryStatusEnum.COMPLETED}
          title="Completed Quests"
          description="Adventures our guild has seen through to the end."
          emptyText="No quests have been completed yet."
        />
        <HomeHowItWorks />
      </main>
    </div>
  );
}
