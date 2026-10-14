import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import PublicGuildmateAvatar from "./public-guildmate-avatar";
import { PUBLIC_GUILDMATE_LEGEND_RANK_STYLE } from "@/app/(public)/guildmates/_constants/public-guildmate-legend-rank";
import { formatExp } from "@/app/(public)/guildmates/_utils/public-guildmate-helper";
import { getGuildmateHref } from "@/utils/user-helper";
import type { TPublicGuildmateLegendViewProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

// Phones: a plain ranked list, 1 to 3 top to bottom
export default function PublicGuildmateLegendList({
  kind,
  entries,
}: TPublicGuildmateLegendViewProps) {
  const isDm = kind === "dm";

  return (
    <ol className="flex flex-col gap-2">
      {[1, 2, 3].map((rank) => {
        const style = PUBLIC_GUILDMATE_LEGEND_RANK_STYLE[rank];
        const entry = entries.find((item) => item.rank === rank);

        if (!entry) {
          // Unclaimed rank: same look as the podium placeholder
          return (
            <li key={`unclaimed-${rank}`}>
              <Item
                variant="outline"
                size="sm"
                className="border-dashed bg-muted/10"
              >
                <ItemMedia className="relative">
                  <Avatar
                    className={cn(
                      "size-11 opacity-60 ring-2 ring-offset-2 ring-offset-card",
                      style.ring,
                    )}
                  >
                    <AvatarFallback className="border border-dashed text-muted-foreground">
                      <User aria-hidden className="size-1/2" />
                    </AvatarFallback>
                  </Avatar>
                  <Badge
                    className={cn(
                      "absolute -right-2 -bottom-1 border-0 px-1 text-[11px] font-bold opacity-70",
                      style.badge,
                    )}
                  >
                    {rank}
                  </Badge>
                </ItemMedia>
                <ItemContent className="min-w-0">
                  <ItemTitle className="font-heading text-foreground/70 italic">
                    Unclaimed
                  </ItemTitle>
                  <ItemDescription className="text-xs text-foreground/60">
                    Awaiting a {isDm ? "master" : "hero"}
                  </ItemDescription>
                </ItemContent>
                <ItemActions className="text-base text-foreground/50">
                  —
                </ItemActions>
              </Item>
            </li>
          );
        }

        const { user, gainedExp } = entry;
        return (
          <li key={user.id}>
            <Item variant="outline" size="sm" className="bg-muted/20">
              <ItemMedia className="relative">
                <PublicGuildmateAvatar
                  name={user.display_name}
                  avatarUrl={user.avatar_url}
                  className={cn(
                    "size-11 ring-2 ring-offset-2 ring-offset-card",
                    style.ring,
                  )}
                />
                <Badge
                  className={cn(
                    "absolute -right-2 -bottom-1 border-0 px-1 text-[11px] font-bold",
                    style.badge,
                  )}
                >
                  {rank}
                </Badge>
              </ItemMedia>
              <ItemContent className="min-w-0">
                <ItemTitle className="w-full">
                  <Link
                    href={getGuildmateHref(user)}
                    className="truncate rounded-sm font-heading underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {user.display_name}
                  </Link>
                </ItemTitle>
                <ItemDescription className="text-xs text-foreground/80">
                  {isDm ? "DM" : "Player"} Lv{" "}
                  {isDm ? user.dm_level : user.player_level} ·{" "}
                  {formatExp(isDm ? user.dm_exp : user.player_exp)} XP total
                </ItemDescription>
              </ItemContent>
              <ItemActions className="flex-col items-end gap-0">
                <span className="font-heading text-base font-semibold text-primary">
                  +{formatExp(gainedExp)} XP
                </span>
                <span className="text-xs text-foreground/80">this month</span>
              </ItemActions>
            </Item>
          </li>
        );
      })}
    </ol>
  );
}
