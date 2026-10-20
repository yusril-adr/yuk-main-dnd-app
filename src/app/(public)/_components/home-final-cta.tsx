"use client";

import Link from "next/link";
import { LayoutDashboard, UserPlus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from "@/app/_components/ui/item";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

export default function HomeFinalCta() {
  const { auth } = useAuthContext();

  return (
    <section
      aria-labelledby="final-cta"
      className="w-full bg-primary text-primary-foreground"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <Item className="flex-col items-start gap-6 p-0 sm:flex-row sm:items-center sm:justify-between">
          <ItemContent className="gap-2">
            {/* `final-cta` is also the hook PublicFooter uses to turn red on home; keep the id in sync */}
            <h2 id="final-cta" className="font-heading text-3xl sm:text-4xl">
              Ready for your first story?
            </h2>
            <ItemDescription className="line-clamp-none text-base text-primary-foreground/80 sm:text-lg">
              The tavern is warm and a seat is waiting for you.
            </ItemDescription>
          </ItemContent>
          <ItemActions className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 w-full px-6 text-base sm:w-auto"
              render={<Link href={auth ? "/stories" : "/login"} />}
              nativeButton={false}
            >
              {auth ? <LayoutDashboard /> : <UserPlus />}
              {auth ? "Find a story" : "Join the guild"}
            </Button>
          </ItemActions>
        </Item>
      </div>
    </section>
  );
}
