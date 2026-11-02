import { cn } from "cn";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { formatCompactBalance } from "@/utils/format-number";

import { BALANCES_MESSAGES } from "@/app/(authenticated)/balances/_messages";
import type { TBalanceAmountDialogProps } from "@/app/(authenticated)/balances/_types/balance-components-props";

export default function BalanceAmountDialog({
  value,
  unit,
  label,
  isSigned = false,
  className,
}: TBalanceAmountDialogProps) {
  const { t } = useT(BALANCES_MESSAGES);
  const { locale } = useLocale();
  const sign = isSigned ? (value < 0 ? "−" : "+") : value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const exact = `${sign}${abs.toLocaleString(localeToBcp47(locale))}`;
  const compact = `${sign}${formatCompactBalance(abs)}`;

  if (compact === exact) {
    return <span className={className}>{exact}</span>;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label={t("amount.showExactAria", { label })}
        className={cn(
          "cursor-pointer underline decoration-dotted underline-offset-4",
          className,
        )}
      >
        {compact}
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{label}</AlertDialogTitle>
          <AlertDialogDescription
            className={cn("font-heading text-2xl tabular-nums", className)}
          >
            {exact}{" "}
            <span className="text-base text-muted-foreground">{unit}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="col-span-2">
            {t("amount.close")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
