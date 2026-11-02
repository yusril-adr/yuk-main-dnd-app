"use client";

import { Printer } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATE_DETAIL_MESSAGES } from "@/app/(public)/guildmates/[slug]/_messages";

export default function PublicGuildmatePrintButton() {
  const { t } = useT(GUILDMATE_DETAIL_MESSAGES);

  return (
    <Button variant="outline" onClick={() => window.print()}>
      <Printer /> {t("detail.printCard")}
    </Button>
  );
}
