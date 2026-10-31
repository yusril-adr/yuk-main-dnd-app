"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";
import type { TPublicGuildmateAdventurerCardBackProps } from "@/app/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

// Print-only back face (hidden on screen); same frame as the front
export default function PublicGuildmateAdventurerCardBack({
  cardNumber,
}: TPublicGuildmateAdventurerCardBackProps) {
  const { t } = useT(GUILDMATES_MESSAGES);

  return (
    <Card
      data-print-face="back"
      aria-hidden
      className="@container hidden aspect-[5/7] w-full max-w-[380px] gap-0 rounded-lg border-4 border-double border-primary/60 bg-card p-1.5 py-1.5 shadow-none ring-0"
    >
      <CardContent className="flex h-full flex-col items-center justify-between rounded-sm border border-primary/30 px-[4cqw] py-[5cqw] text-center">
        <span className="text-[3.4cqw] font-semibold tracking-[0.2em] text-primary uppercase">
          {t("detail.adventurersGuild")}
        </span>

        <div className="flex flex-col items-center gap-[4cqw]">
          {/* Simple crest: shield with crossed swords */}
          <svg
            viewBox="0 0 64 72"
            className="w-[42cqw] text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M32 4 L58 12 V34 C58 52 46 63 32 68 C18 63 6 52 6 34 V12 Z" />
            <path d="M32 10 L52 16 V34 C52 48 43 57 32 61 C21 57 12 48 12 34 V16 Z" />
            <path d="M20 22 L44 50 M44 22 L20 50" />
            <path d="M17 25 L23 19 M41 19 L47 25 M40 47 L44 51 L48 47 M24 47 L20 51 L16 47" />
            <circle cx="32" cy="36" r="4" />
          </svg>
          <span className="font-heading text-[9cqw] leading-none">
            YukMainDnD
          </span>
          <Separator className="w-[30cqw]! bg-primary/50" />
          <span className="text-[3.8cqw] text-foreground/85 italic">
            {t("detail.motto")}
          </span>
        </div>

        <span className="text-[3.4cqw] font-semibold tracking-[0.15em] text-primary uppercase tabular-nums">
          {t("detail.cardNumber", { number: cardNumber })}
        </span>
      </CardContent>
    </Card>
  );
}
