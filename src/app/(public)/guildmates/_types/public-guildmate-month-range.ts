import type { TUtcMonthRange } from "@/app/(public)/_types/utc-month-range";

export type TPublicGuildmateMonthRange = TUtcMonthRange & {
  monthKey: string;
  currentMonthKey: string;
  isCurrent: boolean;
  headingMonth: string;
};
