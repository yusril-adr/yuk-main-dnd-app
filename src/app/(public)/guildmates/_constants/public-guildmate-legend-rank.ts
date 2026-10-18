// Solid medal colors per rank (1-3); no gradients
export const PUBLIC_GUILDMATE_LEGEND_RANK_STYLE: Record<
  number,
  { label: string; ring: string; badge: string; plinth: string }
> = {
  1: {
    label: "1st",
    ring: "ring-amber-500",
    badge: "bg-amber-500 text-amber-950",
    plinth: "h-24 border-amber-500/60",
  },
  2: {
    label: "2nd",
    ring: "ring-zinc-400",
    badge: "bg-zinc-400 text-zinc-950",
    plinth: "h-20 border-zinc-400/60",
  },
  3: {
    label: "3rd",
    ring: "ring-orange-700",
    badge: "bg-orange-700 text-orange-50",
    plinth: "h-16 border-orange-700/60",
  },
};

// Podium visual order: 2nd left, 1st center, 3rd right
export const PUBLIC_GUILDMATE_PODIUM_ORDER = [2, 1, 3];

export const getPublicGuildmateLegendEmptyText = (monthName: string | null) =>
  `No legends yet ${monthName ? `in ${monthName}` : "this month"}. The tavern awaits.`;
