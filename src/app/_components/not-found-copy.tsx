"use client";

import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import { NOT_FOUND_MESSAGES } from "@/app/_messages/not-found";

export default function NotFoundCopy() {
  const { t } = useT(NOT_FOUND_MESSAGES);

  return (
    <>
      <h1 className="font-heading text-2xl">{t("title")}</h1>
      <p>{t("description")}</p>
      <Button variant="default" render={<Link href="/" />}>
        {t("goHome")}
      </Button>
    </>
  );
}
