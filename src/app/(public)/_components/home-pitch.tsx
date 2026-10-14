import { Crown, Sparkles, Users, type LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
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
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {HOME_PITCH_POINTS.map((point, index) => {
          const Icon = ICONS[point.key];
          return (
            <li key={point.key}>
              <Card className="h-full bg-transparent py-0 shadow-none ring-0">
                <CardHeader className="gap-4 px-0">
                  <div className="flex items-center gap-3">
                    {/* Avatar keeps a fixed, centred square that never shrinks in the flex row */}
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
                  </div>
                  <CardTitle
                    role="heading"
                    aria-level={3}
                    className="font-heading text-2xl"
                  >
                    {point.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {point.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
          );
        })}
      </ol>
    </HomeBand>
  );
}
