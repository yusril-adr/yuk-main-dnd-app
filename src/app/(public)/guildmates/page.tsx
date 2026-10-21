import { Suspense } from "react";
import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import GuildMatesPageClient from "./page-client";

export const metadata: Metadata = makePageMetadata({
  title: "Guildmates",
  description:
    "Meet the adventurers and Dungeon Masters of the YukMainDnD guild and see the EXP they have earned.",
  path: "/guildmates",
});

export default function GuildMatesPage() {
  return (
    <Suspense>
      <GuildMatesPageClient />
    </Suspense>
  );
}
