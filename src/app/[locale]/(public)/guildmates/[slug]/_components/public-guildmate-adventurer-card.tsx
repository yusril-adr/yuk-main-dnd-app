import { Crown, Sword } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Else, If, Then } from "react-if";

import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import dayjs from "@/libs/dayjs";
import PublicGuildmateAvatar from "@/app/[locale]/(public)/guildmates/_components/public-guildmate-avatar";
import { formatExp } from "@/app/[locale]/(public)/guildmates/_utils/public-guildmate-helper";
import PublicGuildmateStatRow from "./public-guildmate-stat-row";
import { PUBLIC_GUILDMATE_MEMBER_SINCE_FORMAT } from "@/app/[locale]/(public)/guildmates/[slug]/_constants/public-guildmate-detail";
import {
  getCardNumber,
  getExpShare,
} from "@/app/[locale]/(public)/guildmates/[slug]/_utils/public-guildmate-detail-helper";
import type { TPublicGuildmateAdventurerCardProps } from "@/app/[locale]/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

// Trading-card shaped (5:7, prints at 63x88mm). Everything inside is sized
// in container units (cqw) so it scales with the card width.
export default function PublicGuildmateAdventurerCard({
  guildmate,
}: TPublicGuildmateAdventurerCardProps) {
  const t = useTranslations("guildmateDetail.card");
  const locale = useLocale();
  const username = guildmate.username?.trim();
  const totalExp = (guildmate.dm_exp ?? 0) + (guildmate.player_exp ?? 0);

  return (
    <Card
      data-print-face="front"
      className="@container aspect-[5/7] w-full max-w-[380px] gap-0 rounded-lg border-4 border-double border-primary/60 bg-card p-1.5 py-1.5 shadow-sm ring-0"
    >
      <CardContent className="flex h-full flex-col justify-between rounded-sm border border-primary/30 px-[4cqw] py-[3.5cqw]">
        <div className="flex items-center justify-between text-[3.4cqw] font-semibold tracking-[0.15em] text-primary uppercase">
          <span>{t("guild")}</span>
          <span className="tabular-nums">
            {t("number", { number: getCardNumber(guildmate.id) })}
          </span>
        </div>

        <div className="flex justify-center">
          <PublicGuildmateAvatar
            name={guildmate.display_name}
            avatarUrl={guildmate.avatar_url}
            className="size-[42.4cqw] rounded-md border-2 border-primary/50 p-[1.2cqw] after:hidden [&_img]:rounded-sm"
          />
        </div>

        <div className="flex min-w-0 flex-col items-center text-center">
          <h1 className="w-full truncate font-heading text-[8cqw] leading-tight">
            {guildmate.display_name}
          </h1>
          <If condition={!!username}>
            <Then>
              <span className="w-full truncate text-[4.2cqw] text-foreground/80">
                @{username}
              </span>
            </Then>
          </If>
        </div>

        <div className="-mt-[1cqw] flex min-h-[5cqw] flex-wrap justify-center gap-[1.5cqw]">
          <If condition={guildmate.roles.length > 0}>
            <Then>
              {guildmate.roles.map((role) => (
                <Badge
                  key={role.id}
                  variant="outline"
                  className="h-auto rounded-sm border-primary/40 px-[2cqw] py-[0.6cqw] text-[3.4cqw] text-primary"
                >
                  {role.name}
                </Badge>
              ))}
            </Then>
            <Else>
              <span className="text-[3.6cqw] text-foreground/75 italic">
                {t("wandering")}
              </span>
            </Else>
          </If>
        </div>

        <Separator className="bg-primary/30" />

        <div className="flex flex-col gap-[4cqw]">
          <PublicGuildmateStatRow
            icon={Crown}
            label={t("dm")}
            exp={guildmate.dm_exp}
            share={getExpShare(guildmate.dm_exp, totalExp)}
          />
          <PublicGuildmateStatRow
            icon={Sword}
            label={t("hero")}
            exp={guildmate.player_exp}
            share={getExpShare(guildmate.player_exp, totalExp)}
          />
        </div>

        <div className="flex items-center justify-center gap-[2cqw] text-[3.8cqw]">
          <span className="text-foreground/80">{t("totalXp")}</span>
          <span className="font-heading text-[5cqw] leading-none text-primary tabular-nums">
            {formatExp(totalExp, locale)}
          </span>
        </div>

        <Separator className="bg-primary/30" />

        <p className="-mt-[2cqw] text-center text-[3.8cqw] text-foreground">
          {t("memberSince")}{" "}
          <span className="font-semibold text-foreground">
            {dayjs(guildmate.created_at)
              .locale(locale)
              .format(PUBLIC_GUILDMATE_MEMBER_SINCE_FORMAT)}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
