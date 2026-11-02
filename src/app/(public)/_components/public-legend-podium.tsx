"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { useLocale } from "@/app/_hooks/use-locale";
import PublicAvatar from "@/app/(public)/_components/public-avatar";
import {
  PUBLIC_LEGEND_RANK_STYLE,
  PUBLIC_PODIUM_ORDER,
} from "@/app/(public)/_constants/public-legend-rank";
import { formatExp } from "@/app/(public)/_utils/public-helper";
import { getGuildmateHref } from "@/utils/user-helper";
import type { TPublicLegendViewProps } from "@/app/(public)/_types/public-legend-components-props";

// sm and up: 2nd left, 1st center and raised, 3rd right
export default function PublicLegendPodium({
  kind,
  entries,
  copy,
}: TPublicLegendViewProps) {
  const { locale } = useLocale();

  return (
    <ol className="grid grid-cols-3 items-end gap-2 lg:gap-3">
      {PUBLIC_PODIUM_ORDER.map((rank) => {
        const entry = entries.find((item) => item.rank === rank);
        const style = PUBLIC_LEGEND_RANK_STYLE[rank];

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
                    "absolute -bottom-2 left-1/2 size-5 -translate-x-1/2 shrink-0 justify-center rounded-full border-0 p-0 pb-[1.5px] text-[11px] leading-none font-bold lining-nums proportional-nums opacity-70",
                    style.badge,
                    rank === 1 && "pl-px",
                  )}
                  aria-label={copy.place(rank)}
                >
                  {rank}
                </Badge>
              </div>
              <div className="mt-1 flex w-full min-w-0 flex-col gap-0.5">
                <span className="truncate font-heading text-sm text-foreground/70 italic lg:text-base">
                  {copy.unclaimed}
                </span>
                <span className="text-xs text-foreground/60">
                  {kind === "dm" ? copy.awaitingMaster : copy.awaitingHero}
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
              <PublicAvatar
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
                  "absolute -bottom-2 left-1/2 size-5 -translate-x-1/2 shrink-0 justify-center rounded-full border-0 p-0 pb-[1.5px] text-[11px] leading-none font-bold lining-nums proportional-nums",
                  style.badge,
                  rank === 1 && "pl-px",
                )}
                aria-label={copy.place(rank)}
              >
                {rank}
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
                {isDm
                  ? copy.dmExp(formatExp(user.dm_exp, locale))
                  : copy.playerExp(formatExp(user.player_exp, locale))}
              </span>
            </div>
            <div
              className={cn(
                "flex w-full flex-col items-center justify-center gap-0.5 rounded-t-md border border-b-0 bg-muted/40 px-1",
                style.plinth,
              )}
            >
              <span className="font-heading text-base leading-tight font-semibold text-primary lg:text-lg">
                {copy.gainedExp(formatExp(entry.gainedExp, locale))}
              </span>
              {copy.expCaption ? (
                <span className="text-xs leading-tight text-foreground/80">
                  {copy.expCaption}
                </span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
