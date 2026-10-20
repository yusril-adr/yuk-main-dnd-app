"use client";

import { Printer } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/app/_components/ui/button";

export default function PublicGuildmatePrintButton() {
  const t = useTranslations("guildmateDetail.card");

  return (
    <Button variant="outline" onClick={() => window.print()}>
      <Printer /> {t("print")}
    </Button>
  );
}
