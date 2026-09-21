"use client";

import Link from "next/link";
import { Gauge } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

export function DashboardButton() {
  return (
    <Button
      variant="default"
      nativeButton={false}
      render={<Link href="/dashboard" />}
    >
      <Gauge className="size-4" />
      Dashboard
    </Button>
  );
}
