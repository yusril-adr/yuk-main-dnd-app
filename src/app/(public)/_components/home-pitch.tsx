"use client";

import { Crown, Sparkles, Users, type LucideIcon } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/app/_components/ui/item";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { useT } from "@/app/_hooks/use-t";

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import {
  HOME_PITCH_KEYS,
  type THomePitchKey,
} from "@/app/(public)/_constants/home";

const ICONS: Record<THomePitchKey, LucideIcon> = {
  friends: Users,
  rewards: Sparkles,
  dm: Crown,
};

export default function HomePitch() {
  const { t } = useT("home");

  return (
    <HomeBand labelledBy="what-is-this">
      <HomeSectionHeader
        id="what-is-this"
        title={t("pitch.title")}
        description={t("pitch.description")}
      />
      <ItemGroup className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {HOME_PITCH_KEYS.map((key, index) => {
          const Icon = ICONS[key];
          return (
            <Item
              key={key}
              role="listitem"
              className="flex-col flex-nowrap items-center gap-4 p-0 text-center lg:items-start lg:text-left"
            >
              <ItemHeader className="w-full basis-auto flex-col flex-nowrap items-center justify-center gap-2 lg:flex-row lg:justify-start lg:gap-3">
                {/* Avatar keeps a fixed, centred square that never shrinks */}
                <Avatar
                  data-pitch-icon
                  className="size-12 shrink-0 border border-primary/40 after:hidden md:size-14"
                >
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Icon aria-hidden className="size-6 md:size-7" />
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className="shrink-0">
                  {t("pitch.step", { n: index + 1 })}
                </Badge>
              </ItemHeader>
              <ItemContent className="w-full items-center gap-2 lg:items-start">
                <ItemTitle
                  role="heading"
                  aria-level={3}
                  className="line-clamp-none font-heading text-2xl font-normal"
                >
                  {t(`pitch.${key}.title`)}
                </ItemTitle>
                <ItemDescription className="line-clamp-none text-base">
                  {t(`pitch.${key}.description`)}
                </ItemDescription>
              </ItemContent>
            </Item>
          );
        })}
      </ItemGroup>
    </HomeBand>
  );
}
