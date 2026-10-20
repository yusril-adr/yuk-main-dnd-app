import { User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
import { PUBLIC_GUILDMATE_LEGEND_RANK_STYLE } from "@/app/[locale]/(public)/guildmates/_constants/public-guildmate-legend-rank";
import { formatExp } from "@/app/[locale]/(public)/guildmates/_utils/public-guildmate-helper";
import { getGuildmateHref } from "@/utils/user-helper";
import { Link } from "@/i18n/navigation";
import type { TPublicGuildmateLegendViewProps } from "@/app/[locale]/(public)/guildmates/_types/public-guildmate-components-props";

// Phones: a plain ranked list, 1 to 3 top to bottom
export default function PublicGuildmateLegendList({
  kind,
  entries,
}: TPublicGuildmateLegendViewProps) {
  const t = useTranslations("guildmates.legends");
  const locale = useLocale();
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
                    {t("unclaimed")}
                  </ItemTitle>
                  <ItemDescription className="text-xs text-foreground/60">
                    {isDm ? t("awaitingMaster") : t("awaitingHero")}
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
                    "absolute -right-2 -bottom-1 size-5 shrink-0 justify-center rounded-full border-0 p-0 pb-[1.5px] text-[11px] leading-none font-bold lining-nums proportional-nums",
                    style.badge,
                    rank === 1 && "pl-px",
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
                  {isDm
                    ? t("dmXpTotal", { xp: formatExp(user.dm_exp, locale) })
                    : t("playerXpTotal", {
                        xp: formatExp(user.player_exp, locale),
                      })}
                </ItemDescription>
              </ItemContent>
              <ItemActions className="flex-col items-end gap-0">
                <span className="font-heading text-base font-semibold text-primary">
                  {t("gainedXp", { xp: formatExp(gainedExp, locale) })}
                </span>
                <span className="text-xs text-foreground/80">
                  {t("soFar")}
                </span>
              </ItemActions>
            </Item>
          </li>
        );
      })}
    </ol>
  );
}
