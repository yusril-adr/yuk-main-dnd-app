import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import PublicGuildmateAvatar from "./public-guildmate-avatar";
import {
  PUBLIC_GUILDMATE_LEGEND_RANK_STYLE,
  PUBLIC_GUILDMATE_PODIUM_ORDER,
} from "@/app/(public)/guildmates/_constants/public-guildmate-legend-rank";
import { formatExp } from "@/app/(public)/guildmates/_utils/public-guildmate-helper";
import { getGuildmateHref } from "@/utils/user-helper";
import type { TPublicGuildmateLegendViewProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

// sm and up: 2nd left, 1st center and raised, 3rd right
export default function PublicGuildmateLegendPodium({
  kind,
  entries,
}: TPublicGuildmateLegendViewProps) {
  return (
    <ol className="grid grid-cols-3 items-end gap-2 lg:gap-3">
      {PUBLIC_GUILDMATE_PODIUM_ORDER.map((rank) => {
        const entry = entries.find((item) => item.rank === rank);
        const style = PUBLIC_GUILDMATE_LEGEND_RANK_STYLE[rank];

        if (!entry) {
          // Unclaimed spot: same shape as a filled one, muted
          return (
            <li
              key={rank}
              className="flex min-w-0 flex-col items-center gap-2 text-center"
            >
              <div className="relative">
                <Avatar
                  className={cn(
                    "opacity-60 ring-2 ring-offset-2 ring-offset-card",
                    style.ring,
                    rank === 1 ? "size-16 lg:size-20" : "size-12 lg:size-14",
                  )}
                >
                  <AvatarFallback className="border border-dashed text-muted-foreground">
                    <User aria-hidden className="size-1/2" />
                  </AvatarFallback>
                </Avatar>
                <Badge
                  className={cn(
                    "absolute -bottom-2 left-1/2 -translate-x-1/2 border-0 px-1.5 text-[11px] font-bold opacity-70",
                    style.badge,
                  )}
                >
                  {style.label}
                </Badge>
              </div>
              <div className="mt-1 flex w-full min-w-0 flex-col gap-0.5">
                <span className="truncate font-heading text-sm text-foreground/70 italic lg:text-base">
                  Unclaimed
                </span>
                <span className="text-xs text-foreground/60">
                  Awaiting a {kind === "dm" ? "master" : "hero"}
                </span>
              </div>
              <div
                className={cn(
                  "flex w-full items-center justify-center rounded-t-md border border-b-0 border-dashed bg-muted/20 px-1",
                  style.plinth,
                )}
              >
                <span className="text-xs text-foreground/50">—</span>
              </div>
            </li>
          );
        }

        const { user } = entry;
        const isDm = kind === "dm";

        return (
          <li
            key={rank}
            className="flex min-w-0 flex-col items-center gap-2 text-center"
          >
            <div className="relative">
              <PublicGuildmateAvatar
                name={user.display_name}
                avatarUrl={user.avatar_url}
                className={cn(
                  "ring-2 ring-offset-2 ring-offset-card",
                  style.ring,
                  rank === 1 ? "size-16 lg:size-20" : "size-12 lg:size-14",
                )}
              />
              <Badge
                className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 border-0 px-1.5 text-[11px] font-bold",
                  style.badge,
                )}
              >
                {style.label}
              </Badge>
            </div>
            <div className="mt-1 flex w-full min-w-0 flex-col gap-0.5">
              <Link
                href={getGuildmateHref(user)}
                className="truncate rounded-sm font-heading text-sm underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:text-base"
              >
                {user.display_name}
              </Link>
              <span className="text-xs font-medium text-foreground/80">
                {isDm ? "DM" : "Player"} Lv{" "}
                {isDm ? user.dm_level : user.player_level}
              </span>
            </div>
            <div
              className={cn(
                "flex w-full flex-col items-center justify-center gap-0.5 rounded-t-md border border-b-0 bg-muted/40 px-1",
                style.plinth,
              )}
            >
              <span className="font-heading text-base leading-tight font-semibold text-primary lg:text-lg">
                +{formatExp(entry.gainedExp)} XP
              </span>
              <span className="text-xs leading-tight text-foreground/80">
                this month
              </span>
              <span className="hidden text-xs leading-tight text-foreground/70 lg:block">
                {formatExp(isDm ? user.dm_exp : user.player_exp)} total
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
