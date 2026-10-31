"use client";

import { Printer } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";

export default function PublicGuildmatePrintButton() {
  const { t } = useT(GUILDMATES_MESSAGES);

  return (
    <Button variant="outline" onClick={() => window.print()}>
      <Printer /> {t("detail.printCard")}
    </Button>
  );
}
