import { Shield } from "lucide-react";
import { If, Then } from "react-if";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatExp } from "@/app/(public)/guildmates/_utils/public-guildmate-helper";
import type { TPublicGuildmateHeroProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateHero({
  totalGuildmates,
}: TPublicGuildmateHeroProps) {
  return (
    // Banner-like heading: thin double frame, solid tokens only
    <Card className="rounded-md bg-muted/40 p-1.5 shadow-none">
      <CardContent className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-primary/30 px-4 py-8 text-center sm:gap-4 sm:px-8 sm:py-12">
        <Shield aria-hidden className="size-8 text-primary sm:size-10" />
        <p className="text-xs tracking-[0.25em] text-primary uppercase">
          The Guild Hall
        </p>
        <h1 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
          Meet thy fellow adventurers
        </h1>
        <Separator className="w-40! bg-primary/40 sm:w-56!" />
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          Dungeon masters and heroes of the guild. Honor this month&apos;s
          legends, then find a companion for your next quest.
        </p>
        <If condition={totalGuildmates !== null}>
          <Then>
            <p className="text-sm text-muted-foreground">
              <span className="font-heading text-xl text-foreground">
                {formatExp(totalGuildmates ?? 0)}
              </span>{" "}
              {totalGuildmates === 1 ? "guildmate" : "guildmates"} sworn to the
              guild
            </p>
          </Then>
        </If>
      </CardContent>
    </Card>
  );
}
