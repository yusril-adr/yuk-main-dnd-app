"use client";

import Link from "next/link";

import { buttonVariants } from "@/app/_components/ui/button";

export function GuestActions() {
  return (
    <>
      <Link href="/login" className={buttonVariants({ variant: "default" })}>
        Masuk
      </Link>
    </>
  );
}
