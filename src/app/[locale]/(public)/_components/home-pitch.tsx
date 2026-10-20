import { Crown, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

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

import HomeBand from "@/app/[locale]/(public)/_components/home-band";
import HomeSectionHeader from "@/app/[locale]/(public)/_components/home-section-header";
import { HOME_PITCH_POINTS } from "@/app/[locale]/(public)/_constants/home";

const ICONS: Record<(typeof HOME_PITCH_POINTS)[number]["key"], LucideIcon> = {
  friends: Users,
  rewards: Sparkles,
  dm: Crown,
};

export default function HomePitch() {
  const t = useTranslations("home.pitch");

  return (
    <HomeBand labelledBy="what-is-this">
      <HomeSectionHeader
        id="what-is-this"
        title={t("title")}
        description={t("description")}
      />
      <ItemGroup className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {HOME_PITCH_POINTS.map((point, index) => {
          const Icon = ICONS[point.key];
          return (
            <Item
              key={point.key}
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
                  {t("step", { step: index + 1 })}
                </Badge>
              </ItemHeader>
              <ItemContent className="w-full items-center gap-2 lg:items-start">
                <ItemTitle
                  role="heading"
                  aria-level={3}
                  className="line-clamp-none font-heading text-2xl font-normal"
                >
                  {t(`points.${point.key}.title`)}
                </ItemTitle>
                <ItemDescription className="line-clamp-none text-base">
                  {t(`points.${point.key}.description`)}
                </ItemDescription>
              </ItemContent>
            </Item>
          );
        })}
      </ItemGroup>
    </HomeBand>
  );
}
