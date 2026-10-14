"use client";

import Link from "next/link";
import { LayoutDashboard, UserPlus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

export default function HomeFinalCta() {
  const { auth } = useAuthContext();

  return (
    <section
      aria-labelledby="final-cta"
      className="w-full bg-primary text-primary-foreground"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-20 lg:px-10">
        <div className="flex flex-col gap-2">
          <h2 id="final-cta" className="font-heading text-3xl sm:text-4xl">
            Ready for your first quest?
          </h2>
          <p className="text-base text-primary-foreground/80 sm:text-lg">
            The tavern is warm and a seat is waiting for you.
          </p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          className="h-12 w-full px-6 text-base sm:w-auto"
          render={<Link href={auth ? "/stories" : "/login"} />}
          nativeButton={false}
        >
          {auth ? <LayoutDashboard /> : <UserPlus />}
          {auth ? "Find a quest" : "Join the guild"}
        </Button>
      </div>
    </section>
  );
}
