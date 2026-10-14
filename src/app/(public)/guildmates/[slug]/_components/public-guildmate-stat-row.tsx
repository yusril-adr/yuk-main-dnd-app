import { Progress } from "@/app/_components/ui/progress";
import { formatExp } from "@/app/(public)/guildmates/_utils/public-guildmate-helper";
import type { TPublicGuildmateStatRowProps } from "@/app/(public)/guildmates/[slug]/_types/public-guildmate-detail-components-props";

// Sizes use cqw so the row scales with the card (screen and 63mm print)
export default function PublicGuildmateStatRow({
  icon: Icon,
  label,
  level,
  exp,
  share,
}: TPublicGuildmateStatRowProps) {
  return (
    <div className="flex flex-col gap-[1.5cqw]">
      <div className="flex items-baseline justify-between gap-[2cqw]">
        <span className="flex items-center gap-[1.5cqw] font-heading text-[4.8cqw] leading-none">
          <Icon aria-hidden className="size-[4.8cqw] shrink-0 text-primary" />
          {label}
          <span className="text-primary">Lv {level}</span>
        </span>
        <span className="text-[4.2cqw] leading-none font-semibold text-foreground tabular-nums">
          {formatExp(exp)} XP
        </span>
      </div>
      <Progress
        value={share}
        aria-label={`${label} share of total XP`}
        className="gap-0 [&_[data-slot=progress-indicator]]:bg-primary [&_[data-slot=progress-track]]:h-[2cqw] [&_[data-slot=progress-track]]:rounded-sm [&_[data-slot=progress-track]]:overflow-hidden [&_[data-slot=progress-track]]:bg-primary/15"
      />
    </div>
  );
}
