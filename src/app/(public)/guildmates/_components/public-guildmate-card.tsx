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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/app/_components/ui/item";
import { Separator } from "@/app/_components/ui/separator";
import PublicGuildmateAvatar from "./public-guildmate-avatar";
import { formatExp } from "@/app/(public)/guildmates/_utils/public-guildmate-helper";
import { getGuildmateHref } from "@/utils/user-helper";
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
        <ItemGroup className="gap-1">
          {[
            {
              key: "dm",
              icon: Crown,
              label: "Dungeon Master",
              exp: guildmate.dm_exp,
            },
            {
              key: "player",
              icon: Sword,
              label: "Player",
              exp: guildmate.player_exp,
            },
          ].map(({ key, icon: Icon, label, exp }) => (
            <Item key={key} size="xs" className="p-0">
              <ItemMedia className="text-primary">
                <Icon aria-hidden className="size-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="font-normal text-foreground/80">
                  {label}
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <Badge
                  variant="secondary"
                  className="rounded-sm font-semibold tabular-nums"
                >
                  {formatExp(exp)} EXP
                </Badge>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardFooter>
    </Card>
  );
}
