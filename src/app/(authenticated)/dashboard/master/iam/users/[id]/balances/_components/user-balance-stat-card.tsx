"use client";

import { useState } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/app/_components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { formatCompactBalance } from "@/utils/format-number";

import type { TUserBalanceStatCardProps } from "../_types/user-balance-stat-card-props";

const VALUE_CLASS = "font-heading text-xl tabular-nums sm:text-3xl";

// Compact value; when abbreviated, clicking opens a dialog with the exact one
export default function UserBalanceStatCard({
  label,
  unit,
  icon: Icon,
  value,
  isLoading = false,
}: TUserBalanceStatCardProps) {
  const [open, setOpen] = useState(false);
  const hasValue = value != null && Number.isFinite(value);
  const exact = hasValue ? value.toLocaleString() : "-";
  const compact = hasValue ? formatCompactBalance(value) : "-";
  const abbreviated = compact !== exact;

  return (
    <Card size="sm" className="gap-1 sm:gap-2">
      <CardHeader className="px-3 sm:px-5">
        <CardDescription className="flex items-center gap-1.5 text-xs sm:text-sm">
          <Icon className="size-4 shrink-0 text-primary" />
          <span className="truncate">{label}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-5">
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : abbreviated ? (
          <Button
            type="button"
            variant="link"
            className={`h-auto p-0 text-foreground decoration-dotted underline-offset-4 ${VALUE_CLASS} underline`}
            aria-label={`Show exact ${label}`}
            onClick={() => setOpen(true)}
          >
            {compact}
          </Button>
        ) : (
          <span className={VALUE_CLASS}>{exact}</span>
        )}
      </CardContent>
      {abbreviated && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-xs">
            <DialogHeader>
              <DialogTitle>{label}</DialogTitle>
              <DialogDescription className="font-heading text-2xl text-foreground tabular-nums">
                {exact}{" "}
                <span className="text-base text-muted-foreground">{unit}</span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
