"use client";

import Link from "next/link";
import { LayoutDashboard, ScrollText, Shield, UserPlus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

export default function HomeHero() {
  const { auth } = useAuthContext();

  return (
    <Card className="rounded-md bg-muted/40 p-1.5 shadow-none">
      <CardContent className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-primary/30 px-4 py-10 text-center sm:px-8 sm:py-16">
        <Shield aria-hidden className="size-9 text-primary sm:size-11" />
        <p className="text-xs tracking-[0.25em] text-primary uppercase">
          Yuk Main DnD
        </p>
        <h1 className="font-heading text-3xl leading-tight sm:text-5xl">
          Gather, adventurer
        </h1>
        <Separator className="w-40! bg-primary/40 sm:w-56!" />
        <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
          A guild of storytellers and dice-rollers. Find a table, follow your
          Dungeon Master and write your name into the chronicles.
        </p>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {auth ? (
            <Button
              size="lg"
              render={<Link href="/dashboard" />}
              nativeButton={false}
            >
              <LayoutDashboard /> Open my Board
            </Button>
          ) : null}
          <Button
            size="lg"
            variant={auth ? "outline" : "default"}
            render={<Link href="/stories" />}
            nativeButton={false}
          >
            <ScrollText /> Browse Quests
          </Button>
          {!auth ? (
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              <UserPlus /> Join the Guild
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
