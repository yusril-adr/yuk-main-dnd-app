import { useMemo } from "react";
import { BookOpen, ChessKnight, Coins } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { useT } from "@/app/_hooks/use-t";

import BalanceAmountDialog from "@/app/(authenticated)/balances/_components/balance-amount-dialog";
import { BALANCES_MESSAGES } from "@/app/(authenticated)/balances/_messages";

export default function BalanceSummary() {
  const { auth } = useAuthContext();
  const { t } = useT(BALANCES_MESSAGES);

  const items = useMemo(
    () => [
      {
        label: t("summary.playerExp"),
        unit: t("units.exp"),
        value: auth?.player_exp,
        icon: ChessKnight,
      },
      {
        label: t("summary.dmExp"),
        unit: t("units.exp"),
        value: auth?.dm_exp,
        icon: BookOpen,
      },
      {
        label: t("summary.goldPieces"),
        unit: t("units.gp"),
        value: auth?.points,
        icon: Coins,
      },
    ],
    [auth?.dm_exp, auth?.player_exp, auth?.points, t],
  );

  return (
    <section
      aria-label={t("summary.aria")}
      className="grid grid-cols-3 gap-2 sm:gap-4"
    >
      {items.map(({ label, unit, value, icon: Icon }) => (
        <Card key={label} size="sm" className="gap-1 sm:gap-2">
          <CardHeader className="px-3 sm:px-5">
            <CardDescription className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Icon className="size-4 shrink-0 text-primary" />
              <span className="truncate">{label}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-5">
            {value == null ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <BalanceAmountDialog
                value={value}
                unit={unit}
                label={label}
                className="w-fit font-heading text-xl tabular-nums sm:text-3xl"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
