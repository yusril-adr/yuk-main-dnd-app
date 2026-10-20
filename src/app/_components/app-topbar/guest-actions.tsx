"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/app/_components/ui/button";

// Plain next/link: /login is never locale-prefixed
export function GuestActions() {
  const t = useTranslations("appTopbar");

  return (
    <>
      <Link href="/login" className={buttonVariants({ variant: "default" })}>
        {t("login")}
      </Link>
    </>
  );
}
