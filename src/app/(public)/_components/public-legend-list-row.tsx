"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";
import { If, Then } from "react-if";

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
import { useLocale } from "@/app/_hooks/use-locale";
import PublicAvatar from "@/app/(public)/_components/public-avatar";
import { PUBLIC_LEGEND_RANK_STYLE } from "@/app/(public)/_constants/public-legend-rank";
import { formatExp } from "@/app/(public)/_utils/public-helper";
import { getGuildmateHref } from "@/utils/user-helper";
import type { TPublicLegendListRowProps } from "@/app/(public)/_types/public-legend-list-row-props";

export default function PublicLegendListRow({
  rank,
  kind,
  entry,
  copy,
}: TPublicLegendListRowProps) {
  const { locale } = useLocale();
  const isDm = kind === "dm";
  const style = PUBLIC_LEGEND_RANK_STYLE[rank];

  if (!entry) {
    // Unclaimed rank: same look as the podium placeholder
    return (
      <li>
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
                "absolute -right-2 -bottom-1 size-5 shrink-0 justify-center rounded-full border-0 p-0 pb-[1.5px] text-[11px] leading-none font-bold lining-nums proportional-nums opacity-70",
                style.badge,
                rank === 1 && "pl-px",
              )}
            >
              {rank}
            </Badge>
          </ItemMedia>
          <ItemContent className="min-w-0">
            <ItemTitle className="font-heading text-foreground/70 italic">
              {copy.unclaimed}
            </ItemTitle>
            <ItemDescription className="text-xs text-foreground/60">
              {isDm ? copy.awaitingMaster : copy.awaitingHero}
            </ItemDescription>
          </ItemContent>
          <ItemActions className="text-base text-foreground/50">—</ItemActions>
        </Item>
      </li>
    );
  }

  const { user, gainedExp } = entry;

  return (
    <li>
      <Item variant="outline" size="sm" className="bg-muted/20">
        <Link
          href={getGuildmateHref(user)}
          className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ItemMedia className="relative">
            <PublicAvatar
              name={user.display_name}
              avatarUrl={user.avatar_url}
              className={cn(
                "size-11 ring-2 ring-offset-2 ring-offset-card",
                style.ring,
              )}
            />
            <Badge
              className={cn(
                "absolute -right-2 -bottom-1 size-5 shrink-0 justify-center rounded-full border-0 p-0 pb-[1.5px] text-[11px] leading-none font-bold lining-nums proportional-nums",
                style.badge,
                rank === 1 && "pl-px",
              )}
            >
              {rank}
            </Badge>
          </ItemMedia>
          <ItemContent className="min-w-0">
            <ItemTitle className="w-full font-heading underline-offset-4 group-hover:text-primary group-hover:underline">
              {user.display_name}
            </ItemTitle>
            <ItemDescription className="text-xs text-foreground/80">
              {isDm
                ? copy.dmExpTotal(formatExp(user.dm_exp, locale))
                : copy.playerExpTotal(formatExp(user.player_exp, locale))}
            </ItemDescription>
          </ItemContent>
        </Link>
        <ItemActions className="flex-col items-end gap-0">
          <span className="font-heading text-base font-semibold text-primary">
            {copy.gainedExp(formatExp(gainedExp, locale))}
          </span>
          <If condition={!!copy.expCaption}>
            <Then>
              <span className="text-xs text-foreground/80">{copy.expCaption}</span>
            </Then>
          </If>
        </ItemActions>
      </Item>
    </li>
  );
}
