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

import HomeBand from "@/app/(public)/_components/home-band";
import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import { HOME_PITCH_POINTS } from "@/app/(public)/_constants/home";

const ICONS: Record<(typeof HOME_PITCH_POINTS)[number]["key"], LucideIcon> = {
  friends: Users,
  rewards: Sparkles,
  dm: Crown,
};

export default function HomePitch() {
  return (
    <HomeBand labelledBy="what-is-this">
      <HomeSectionHeader
        id="what-is-this"
        title="What is YukMainDnD?"
        description="A guild for Dungeons & Dragons and other tabletop RPGs. Join quests, meet guildmates and track your adventures in one place."
      />
      <ItemGroup className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {HOME_PITCH_POINTS.map((point, index) => {
          const Icon = ICONS[point.key];
          return (
            <Item
              key={point.key}
              role="listitem"
              className="flex-col flex-nowrap items-start gap-4 p-0"
            >
              <ItemHeader className="w-full basis-auto flex-row flex-nowrap items-center justify-start gap-3">
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
                  Step {index + 1}
                </Badge>
              </ItemHeader>
              <ItemContent className="w-full gap-2">
                <ItemTitle
                  role="heading"
                  aria-level={3}
                  className="line-clamp-none font-heading text-2xl font-normal"
                >
                  {point.title}
                </ItemTitle>
                <ItemDescription className="line-clamp-none text-base">
                  {point.description}
                </ItemDescription>
              </ItemContent>
            </Item>
          );
        })}
      </ItemGroup>
    </HomeBand>
  );
}
