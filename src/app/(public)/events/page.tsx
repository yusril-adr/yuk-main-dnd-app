import { Suspense } from "react";
import type { Metadata } from "next";

import { makePageMetadata } from "@/utils/seo-helper";

import EventsPageClient from "./page-client";

export const metadata: Metadata = makePageMetadata({
  title: "Events",
  description:
    "Browse upcoming and past YukMainDnD guild events, see who hosts them and join the gathering.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <Suspense>
      <EventsPageClient />
    </Suspense>
  );
}
