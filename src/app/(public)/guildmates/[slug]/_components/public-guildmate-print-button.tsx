"use client";

import { Printer } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

export default function PublicGuildmatePrintButton() {
  return (
    <Button variant="outline" onClick={() => window.print()}>
      <Printer /> Print card
    </Button>
  );
}
