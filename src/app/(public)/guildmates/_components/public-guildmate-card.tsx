import Link from "next/link";
import { Crown, Sword } from "lucide-react";
import { If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import PublicGuildmateAvatar from "./public-guildmate-avatar";
import {
  formatExp,
  getGuildmateHref,
} from "@/app/(public)/guildmates/_utils/public-guildmate-helper";
import type { TPublicGuildmateCardProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateCard({
  guildmate,
}: TPublicGuildmateCardProps) {
  const username = guildmate.username?.trim();

  return (
    <Card className="h-full gap-3 rounded-md py-4 shadow-none">
      <CardContent className="flex items-center gap-3 px-4">
        <PublicGuildmateAvatar
          name={guildmate.display_name}
          avatarUrl={guildmate.avatar_url}
          className="size-12 ring-1 ring-primary/30 ring-offset-2 ring-offset-card"
        />
        <div className="flex min-w-0 flex-col">
          <CardTitle className="truncate font-heading text-base">
            <Link
              href={getGuildmateHref(guildmate)}
              className="rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {guildmate.display_name}
            </Link>
          </CardTitle>
          <If condition={!!username}>
            <Then>
              <span className="truncate text-xs text-foreground/70">
                @{username}
              </span>
            </Then>
          </If>
        </div>
      </CardContent>

      <If condition={guildmate.roles.length > 0}>
        <Then>
          <div className="flex flex-wrap gap-1.5 px-4">
            {guildmate.roles.map((role) => (
              <Badge
                key={role.id}
                variant="outline"
                className="rounded-sm border-primary/30 text-[11px] text-primary"
              >
                {role.name}
              </Badge>
            ))}
          </div>
        </Then>
      </If>

      <CardFooter className="mt-auto flex-col items-stretch gap-1.5 px-4 pt-0">
        <Separator className="mb-1.5" />
        <div className="flex items-center gap-2 text-sm">
          <Crown aria-hidden className="size-4 shrink-0 text-primary" />
          <span className="text-foreground/80">
            <span className="font-medium text-foreground">
              DM Lv {guildmate.dm_level}
            </span>{" "}
            · {formatExp(guildmate.dm_exp)} XP
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Sword aria-hidden className="size-4 shrink-0 text-primary" />
          <span className="text-foreground/80">
            <span className="font-medium text-foreground">
              Player Lv {guildmate.player_level}
            </span>{" "}
            · {formatExp(guildmate.player_exp)} XP
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
