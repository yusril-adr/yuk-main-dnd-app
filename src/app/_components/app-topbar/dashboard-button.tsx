"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/app/_components/ui/button";

// Plain next/link: the dashboard is never locale-prefixed
export function DashboardButton() {
  const t = useTranslations("appTopbar");

  return (
    <Button
      variant="default"
      nativeButton={false}
      render={<Link href="/dashboard" />}
    >
      {t("dashboard")}
    </Button>
  );
}
