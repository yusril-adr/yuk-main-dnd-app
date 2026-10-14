import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import HomePageClient from "./page-client";

export const metadata: Metadata = makePageMetadata({
  description:
    "Find open D&D and tabletop RPG quests, meet the guild's legends and follow the chronicles of YukMainDnD.",
  path: "/",
});

export default function Home() {
  return <HomePageClient />;
}
