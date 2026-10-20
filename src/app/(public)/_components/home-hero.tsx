"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  ScrollText,
  UserPlus,
} from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { ItemDescription } from "@/app/_components/ui/item";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

import { HOME_GUILD_PHOTOS } from "@/app/(public)/_constants/home-guild-photos";

// Different from the first carousel slide so the photo is not shown twice in a row
const HERO_PHOTO = HOME_GUILD_PHOTOS[1] ?? HOME_GUILD_PHOTOS[0];

export default function HomeHero() {
  const { auth } = useAuthContext();

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate flex min-h-[78svh] w-full items-end overflow-hidden bg-foreground sm:min-h-[82svh] sm:items-center"
    >
      {HERO_PHOTO?.src && (
        <Image
          src={HERO_PHOTO.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: HERO_PHOTO.objectPosition ?? "center" }}
        />
      )}
      {/* Flat overlay (no gradient) keeps the text legible on the photo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/65" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <Badge
          variant="outline"
          className="border-white/40 bg-black/30 tracking-[0.2em] text-white uppercase"
        >
          A tabletop RPG guild
        </Badge>
        <h1
          id="home-hero-title"
          className="max-w-3xl font-heading text-4xl leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Gather your party. Your legend starts here.
        </h1>
        <ItemDescription className="line-clamp-none max-w-xl text-base text-white/85 sm:text-xl">
          Find a table, follow your Dungeon Master and write your name into the
          chronicles of YukMainDnD.
        </ItemDescription>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {auth ? (
            <Button
              size="lg"
              className="h-12 px-6 text-base"
              render={<Link href="/dashboard" />}
              nativeButton={false}
            >
              <LayoutDashboard /> Open my Board
            </Button>
          ) : (
            <Button
              size="lg"
              className="h-12 px-6 text-base"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              <UserPlus /> Join the guild
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/60 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            render={<Link href="/stories" />}
            nativeButton={false}
          >
            <ScrollText /> See stories <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
