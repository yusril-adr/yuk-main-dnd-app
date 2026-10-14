import { Suspense } from "react";
import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import StoriesPageClient from "./page-client";

export const metadata: Metadata = makePageMetadata({
  title: "Quests",
  description:
    "Browse open and completed tabletop RPG quests, see who runs them and claim a seat at the table.",
  path: "/stories",
});

export default function StoriesPage() {
  return (
    <Suspense>
      <StoriesPageClient />
    </Suspense>
  );
}
