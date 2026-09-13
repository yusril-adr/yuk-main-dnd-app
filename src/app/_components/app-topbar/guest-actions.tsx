"use client";

import Link from "next/link";

import { buttonVariants } from "@/app/_components/ui/button";

export function GuestActions() {
  return (
    <>
      <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
        Masuk
      </Link>
      <Link href="/register" className={buttonVariants({ variant: "default" })}>
        Daftar
      </Link>
    </>
  );
}
