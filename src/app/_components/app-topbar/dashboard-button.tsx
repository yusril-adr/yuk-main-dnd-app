"use client";

import Link from "next/link";

import { Button } from "@/app/_components/ui/button";

export function DashboardButton() {
  return (
    <Button
      variant="default"
      nativeButton={false}
      render={<Link href="/dashboard" />}
    >
      Dashboard
    </Button>
  );
}
